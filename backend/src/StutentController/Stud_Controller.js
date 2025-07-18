require("dotenv").config();
const express = require("express");
const {
  FaiulerResponse,
  CustomResponse,
} = require("../../Utlis/responseformatters");
const jwt = require("jsonwebtoken");
const {
  users,
  categories,
  levels,
  questions,
  options,
  quiz_attempts,
  answers,
  results,
  leaderboard,
} = require("../../Database/models");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const Create_Token = require("../../Utlis/helpers");
const { where } = require("sequelize");
const { raw } = require("mysql2");
const { Op } = require("sequelize");
const { SendEmail } = require("../../Utlis/mailer");

const Create_User = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const find_user = await users.findOne({
      where: {
        email: email,
      },
    });
    if (find_user) {
      return CustomResponse(res, false, 400, "Email alredy exist");
    }
    const saltround = 10;
    const hashpassword = await bcrypt.hash(password, saltround);
    const user_create = await users.create({
      name: name,
      email: email,
      password: hashpassword,
    });

    const data = {
      user_create,
    };
    return CustomResponse(res, true, 200, data, "user create successfully");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "user not create");
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const find_user = await users.findOne({
      where: {
        email: email,
      },
    });

    if (!find_user) {
      return CustomResponse(res, false, 400, "user not exist");
    }

    const comparepassword = await bcrypt.compare(password, find_user.password);
    if (!comparepassword) {
      return CustomResponse(res, false, 400, {}, "incorrect credentials");
    }

    const token = Create_Token(
      {
        id: find_user.id,
        email: find_user.email,
        role: find_user.role,
      },
      "24h"
    );

    const data = {
      token: token,
      Log_data: find_user,
    };

    return CustomResponse(res, true, 200, data, "Login successfully");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(
      res,
      false,
      500,
      {},
      "Please try again you are not logged"
    );
  }
};

const Getcategories = async (req, res) => {
  try {
    const check_role = await users.findOne({
      where: {
        email: req.user.email,
      },
    });
    console.log(check_role, "checkrole");

    if (!check_role.role === "student") {
      return CustomResponse(
        res,
        false,
        400,
        "Access denied : only access user"
      );
    }
    const All_categories = await categories.findAll();

    return CustomResponse(
      res,
      true,
      200,
      { All_categories },
      "here your all categories"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "failed to get catetogories");
  }
};

const Levels = async (req, res) => {
  try {
    const Level_data = await levels.findAll();

    return CustomResponse(res, true, 200, { Level_data }, "here are levels");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "failed to get levels");
  }
};

const Questions_list = async (req, res) => {
  try {
    const { categoryid, levelId } = req.params;

    const all_questions = await questions.findAll({
      where: {
        category_id: categoryid,
        level_id: levelId,
      },
      raw: true,
      nest: true,
    });

    const All_options = await options.findAll();

    const data = {
      all_questions,
      All_options,
    };

    return CustomResponse(res, true, 200, data, "here your list of questions");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(
      res,
      false,
      500,
      {},
      "failed to fetched questions List"
    );
  }
};

const quizz_attempt = async (req, res) => {
  const { categoryid, levelId } = req.query;

  try {
    const Quiz_attempt_data = await quiz_attempts.findOne({
      where: {
        user_id: req.user.id,
        category_id: categoryid,
        level_id: levelId,
        status: "in_progress",
      },
    });
    console.log(Quiz_attempt_data, "Quiz_attempt_data");

    return CustomResponse(res, true, 200, Quiz_attempt_data, "start quizz");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "quizz is not start yet");
  }
};

const Attempt_Quizz = async (req, res) => {
  const { category_id, level_id, user_id } = req.body;

  try {
    const check_status = await quiz_attempts.findOne({
      where: {
        user_id: user_id,
        category_id: category_id,
        level_id: level_id,
        status: "in_progress",
      },
    });

    console.log(check_status, "check_status");

    if (check_status) {
      return CustomResponse(
        res,
        false,
        400,
        { errorCode: "duplicateEntry" },
        "already have same quizz in progress"
      );
    } else {
      const Select_Option = await quiz_attempts.create({
        user_id: user_id,
        category_id: category_id,
        level_id: level_id,
      });

      const data = { Select_Option };

      return CustomResponse(res, true, 200, data, "start quizz");
    }
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "quizz is not start yet");
  }
};

const Check_Status = async (req, res) => {
  try {
    const Data_quizz_attempt = await quiz_attempts.findAll({
      where: {
        user_id: req.user.id,
        status: "in_progress",
      },
    });

    const seen = new Set();

    const Filter_status = Data_quizz_attempt.filter((s) => {
      const key = `${s.category_id} | ${s.level_id}`;
      if (seen.has(key)) return false;
      else {
        seen.add(key);
        return true;
      }
    });

    const data = { Filter_status };
    return CustomResponse(res, true, 200, data, "start quizz");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "quizz is not start yet");
  }
};
const Add_Select_Option = async (req, res) => {
  const { user_id, selected_option_id, is_correct, question_id, attempt_id } =
    req.body;

  try {
    const Select_Option = await answers.create({
      user_id: user_id,
      selected_option_id: selected_option_id,
      is_correct: is_correct,
      question_id: question_id,
      attempt_id: attempt_id,
    });

    const data = { Select_Option };
    return CustomResponse(
      res,
      true,
      200,
      data,
      "Your selected option are storing in anser table"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "your option is not selected");
  }
};

const Answered_question = async (req, res) => {
  const { categoryid, levelId } = req.query;
  try {
    const answered_question = await answers.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: quiz_attempts,
          as: "quiz_attempt",
        },
      ],
      raw: true,
      nest: true,
    });
    console.log(answered_question, "answered_question");

    const allquestion = await questions.findAll({ raw: true });

    const filtered = answered_question.filter(
      (ans) =>
        ans.quiz_attempt?.category_id === categoryid &&
        ans.quiz_attempt?.level_id === levelId
    );
    const answeredSet = new Set(filtered.map((a) => a.question_id));

    const unanswered = allquestion.filter((q) => !answeredSet.has(q.id));
    console.log(unanswered, "unswerd");

    const data = { unanswered };
    return CustomResponse(
      res,
      true,
      200,
      data,
      "there are rest of the question"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "questions are not sorted");
  }
};

const Resume_quizz = async (req, res) => {
  const { categoryid, levelId } = req.query;

  try {
    const answer = await answers.findAll({
      include: [
        {
          model: quiz_attempts,
          as: "quiz_attempt",
          where: {
            user_id: req.user.id,
            category_id: categoryid,
            level_id: levelId,
            status: "in_progress",
          },
        },
      ],
    });

    console.log(answer, "answer");

    const question = await questions.findAll({
      where: {
        category_id: Number(categoryid),
        level_id: Number(levelId),
      },
      raw: true,
    });

    console.log(question, "questionnnss");

    const Answerd_questions = new Set(answer.map((a) => Number(a.question_id)));

    const filtered_question = question.filter(
      (q) => !Answerd_questions.has(q.id)
    );
    console.log(filtered_question, "filtered_question");

    const filtered_question_id = filtered_question.map((id) => id.id);

    const All_options = await options.findAll({
      where: { question_id: filtered_question_id },
    });

    // const answeredIds = new Set(answer.map((a) => a.question_id));

    // const questionArrays = await Promise.all(
    //   Remove_duplicacy.map(async (item) => {
    //     const questionsList = await questions.findAll({
    //       where: {
    //         level_id: item.level_id,
    //         category_id: item.category_id,
    //       },
    //     });

    // ✅ Mark each question
    // const updatedQuestions = questionsList.map((q) => {
    //     console.log(q.id, "question ID being checked")

    // ...q.dataValues, // Sequelize returns model instance — convert to plain object
    // isAnswered: answeredIds.has(q.id),
    // });

    // console.log(updatedQuestions,"updatequestion");

    //     return {
    //       category_id: item.category_id,
    //       level_id: item.level_id,
    //       questions: updatedQuestions,
    //     };
    //   })
    // );

    return CustomResponse(
      res,
      true,
      200,
      { filtered_question, All_options },
      "continue with questions"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "failed to resume your quizz");
  }
};

const Complete_quizz = async (req, res) => {
  const { categoryid, levelId } = req.query;
  const { completed_at, status } = req.body;
  try {
    const quizz_attempt = await quiz_attempts.update(
      {
        completed_at: completed_at,
        status: status,
      },
      {
        where: {
          user_id: req.user.id,
          category_id: categoryid,
          level_id: levelId,
        },
      }
    );
    return CustomResponse(
      res,
      true,
      200,
      { quizz_attempt },
      "You completed your quizz"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(
      res,
      false,
      500,
      {},
      "faield to update quizz status"
    );
  }
};

const Result_per_quizz = async (req, res) => {
  try {
    // Step 1: Find all  quiz attempts
    const completedAttempts = await quiz_attempts.findAll({
      where: { user_id: req.user.id, status: "completed" },
    });

    const attemptIds = completedAttempts.map((a) => a.id);

    // Step 2: If no attempts, return early
    if (attemptIds.length === 0) {
      return CustomResponse(
        res,
        true,
        200,
        { result: [] },
        "No completed attempts found."
      );
    }

    // Step 3: Find all answers related to those attempt IDs
    const result = await answers.findAll({
      where: {
        user_id: req.user.id,
        attempt_id: {
          [Op.in]: attemptIds,
        },
      },
    });

    console.log(result, "result");

    return CustomResponse(res, true, 200, { result }, "Your result is ready.");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "There is no result.");
  }
};

const Result_table = async (req, res) => {
  const { attempt_id } = req.body;

  try {
    const Question_attempt = await answers.findAll({
      where: {
        user_id: req.user.id,
        attempt_id: attempt_id,
      },
    });
    console.log(Question_attempt, "Question_attempt");

    const correct_answer = await answers.findAll({
      where: {
        user_id: req.user.id,
        attempt_id: attempt_id,
        is_correct: 1,
      },
    });

    console.log(correct_answer, "correct_answer");

    const Question = Question_attempt.length;

    const score = correct_answer.length * 5;
    console.log(Question, "Questionatt");
    console.log(score, "score");

    const result = await results.upsert({
      attempt_id: attempt_id,
      score: score,
      total_questions: Question,
      user_id: req.user.id,
    });

    const Find_score = await answers.findAll({
      where: {
        user_id: req.user.id,
        is_correct: 1,
      },
    });
    console.log(Find_score, "find score");
    const User_score = Find_score.length * 5;

    const leaderchart = await leaderboard.upsert({
      user_id: req.user.id,
      total_score: User_score,
    });
    const Get_result = await results.findOne({
      where: {
        attempt_id: attempt_id,
      },
    });
    return CustomResponse(
      res,
      true,
      200,
      { Get_result },
      "here is your result"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "failed to get your result");
  }
};

const Personal_details = async (req, res) => {
  const { name, phone } = req.body;
  console.log(name, "mname");

  try {
    if (!req.file) {
      const Update = await users.update(
        { name: name, phone: phone },
        {
          where: {
            email: req.user.email,
          },
        }
      );
      return CustomResponse(res, true, 200, { Update }, "update your details");
    } else {
      const Update = await users.update(
        { name: name, phone: phone, image: req.file.filename },
        {
          where: {
            email: req.user.email,
          },
        }
      );
      return CustomResponse(res, true, 200, { Update }, "update your details");
    }

  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "not update your details");
  }
};

const Get_Personal_details = async (req, res) => {
  try {
    const personal_data = await users.findOne({
      where: {
        email: req.user.email,
      },
      include: [{ model: results, attributes: ["score"] }],
    });

    return CustomResponse(
      res,
      true,
      200,
      { personal_data },
      "here are your details"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "failed to feth your details");
  }
};

const Change_Password = async (req, res) => {
  const { oldpassword, newpassword } = req.body;
  try {
    const check_old_pass = await users.findOne({
      where: { id: req.user.id },
    });
    const password = await bcrypt.compare(oldpassword, check_old_pass.password);
    console.log(password, "password");

    if (!password) {
      return CustomResponse(
        res,
        false,
        401,
        {},
        "Your old password is incorrect"
      );
    }
    const saltround = 10;
    const hashpassword = await bcrypt.hash(newpassword, saltround);
    const password_change = await users.update(
      { password: hashpassword },
      { where: { id: req.user.id } }
    );
    return CustomResponse(res, true, 200, {}, "Your password is update");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(
      res,
      false,
      500,
      {},
      "Failed to change your password"
    );
  }
};

const LeaderBoard = async (req, res) => {
  try {
    const leaderchart = await leaderboard.findAll({
      include: [
        {
          model: users,
        },
      ],
    });

    return CustomResponse(
      res,
      true,
      200,
      { leaderchart },
      "List of leaderboard"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "failed to find leaderboard");
  }
};

const Clear_All_quizz = async (req, res) => {
  const { completed_at, status } = req.body;
  try {
    const quizz_attempt = await quiz_attempts.update(
      {
        completed_at: completed_at,
        status: status,
      },
      {
        where: {
          user_id: req.user.id,
        },
      }
    );
    return CustomResponse(
      res,
      true,
      200,
      { quizz_attempt },
      "You completed your quizz"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(
      res,
      false,
      500,
      {},
      "faield to update quizz status"
    );
  }
};

const Forgot_password = async (req, res) => {
  const { email } = req.body;
  try {
    const check_user = await users.findOne({
      where: { email: email },
    });

    if (!email) {
      return CustomResponse(res, false, 404, {}, "Email does not exist");
    }

    const token = Create_Token(
      {
        id: check_user.id,
        email: check_user.email,
        role: check_user.role,
      },
      "1h"
    );

    const resetLink = `http://localhost:5173/reset_password/${token}`;

    const emailOptions = {
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${check_user.name || "User"},</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    };

    const { success, error } = await SendEmail(emailOptions);

    if (!success)
      return res.status(500).json({ message: "email sending failed" });

    return CustomResponse(res, true, 200, {}, "Mail send successfully");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(
      res,
      false,
      500,
      {},
      "Failed to forgot your password"
    );
  }
};

const Reset_password = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, "secretecode304");
    const user = await users.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const saltround = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltround);
    user.password = hashedPassword;
    await user.save(); // updating value in user object
    return CustomResponse(res, true, 200, {}, "password is changed");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(
      res,
      false,
      500,
      {},
      "Failed to reset your password"
    );
  }
};
// const Correct_answer = async (req, res) => {
//   const { attempt_id } = req.query;
//   try {
//     const correct_answer = await answers.findAll({
//       where: {
//         user_id: req.user.id,
//         attempt_id: attempt_id,
//         is_correct: 1,
//       },
//     });
//     const Question_attempt = await answers.findAll({
//       where: {
//         user_id: req.user.id,
//         attempt_id: attempt_id,
//       },
//     });

//     const Question = Question_attempt.length;
//     const score = correct_answer.length * 5;

//     console.log(Question, "Questionattempt");
//     console.log(Question_attempt, "Question_attempt");
//     console.log(score, "score");
//     console.log(correct_answer, "correctanswer");

//     return CustomResponse(
//       res,
//       true,
//       200,
//       { correct_answer },
//       "here is your result"
//     );
//   } catch (error) {
//     console.log(error);
//     return FaiulerResponse(res, false, 500, {}, "faield to get your result");
//   }
// };

module.exports = {
  Create_User,
  Login,
  Getcategories,
  Levels,
  Questions_list,
  Add_Select_Option,
  Attempt_Quizz,
  Check_Status,
  Answered_question,
  Resume_quizz,
  quizz_attempt,
  Complete_quizz,
  Result_per_quizz,
  Result_table,
  Personal_details,
  Get_Personal_details,
  Change_Password,
  LeaderBoard,
  Clear_All_quizz,
  Reset_password,
  Forgot_password,
  // Correct_answer,
};
