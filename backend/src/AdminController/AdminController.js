require("dotenv").config();
const express = require("express");
const {
  FaiulerResponse,
  CustomResponse,
} = require("../../Utlis/responseformatters");
const bcrypt = require("bcrypt");
const {
  categories,
  levels,
  questions,
  options,
  users,
  leaderboard,
} = require("../../Database/models");
const { where } = require("sequelize");
const app = express();
app.use(express.json());

const Category_Level = async (req, res) => {
  const { name } = req.body;

  // Check if file is uploaded
  if (!req.file) {
    return FaiulerResponse(res, false, 400, {}, "Image file is required");
  }

  try {
    const category = await categories.create({
      name: name,
      image: req.file.filename, // Save filename (or path)
    });

    const level = await levels.findAll();
    const getcategory = await categories.findOne({
      where: {
        name: name,
      },
    });

    const data = { category, level, getcategory };
    return CustomResponse(res, true, 200, data, "Category added successfully");
  } catch (error) {
    console.log();
    return FaiulerResponse(res, false, 500, {}, "category is not added");
  }
};

const Get_Category = async (req, res) => {
  try {
    const category = await categories.findAll();
    const level = await levels.findAll();
    const data = { level, category };
    return CustomResponse(res, true, 200, data, "here are categories");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "there is no catagory");
  }
};

const Add_question = async (req, res) => {
  const { question_text, category_id, level_id } = req.body;

  try {
    const question = await questions.create({
      question_text: question_text,
      category_id: category_id,
      level_id: level_id,
      created_by: req.user.id,
    });
    const data = { question };

    return CustomResponse(res, true, 200, data, "question is submit");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(
      res,
      false,
      500,
      {},
      "plese selcet level and category"
    );
  }
};

const Options = async (req, res) => {
  const options_payload = req.body;

  try {
    const option = await Promise.all(
      options_payload.map((item) =>
        options.create({
          option_text: item.option_text,
          question_id: item.question_id,
          is_correct: item.is_correct,
        })
      )
    );

    return CustomResponse(res, true, 200, { option }, "question is submit");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "Options are not added");
  }
};

const Users_List = async (req, res) => {
  try {
    const users_list = await users.findAll({
      where: {
        role: "student",
      },
    });

    return CustomResponse(
      res,
      true,
      200,
      { users_list },
      "Users list is fetched"
    );
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "not found user list");
  }
};

const Questions_list = async (req, res) => {
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = (page - 1) * limit;
  try {
    const { count, rows } = await questions.findAndCountAll({
      offset,
      limit,
      raw: true,
    });

    const data = {
      totalpage: Math.ceil(count / limit),
      rows: rows,
      currentpage: page,
      totallist: count,
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

const Admin_details = async (req, res) => {
  try {
    const personal_data = await users.findOne({
      where: {
        email: req.user.email,
      },
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

const Update_Admin_details = async (req, res) => {
  const { name, phone } = req.body;

  try {
    const Update = await users.update(
      { name: name, phone: phone },
      {
        where: {
          email: req.user.email,
        },
      }
    );

    return CustomResponse(res, true, 200, { Update }, "update your details");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "not update your details");
  }
};

const Admin_Change_Password = async (req, res) => {
  const { oldpassword, newpassword } = req.body;
  try {
    const check_old_pass = await users.findOne({
      where: { id: req.user.id },
    });
    const password = await bcrypt.compare(oldpassword,check_old_pass.password)
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
    return FaiulerResponse(res, false, 500, {}, "Failed to change your password");
  }
};

const Admin_LeaderBoard = async (req, res) => {
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

const Delete_User = async (req, res) => {
  const { id } = req.query;
  try {
    const delete_user = await users.destroy({
      where: { id: id },
    });
    return CustomResponse(res, true, 200, {}, "User is deleted");
  } catch (error) {
    console.log(error);
    return FaiulerResponse(res, false, 500, {}, "Failed to delete user");
  }
};

module.exports = {
  Category_Level,
  Get_Category,
  Add_question,
  Options,
  Users_List,
  Questions_list,
  Admin_details,
  Update_Admin_details,
  Admin_Change_Password,
  Admin_LeaderBoard,
  Delete_User,
};
