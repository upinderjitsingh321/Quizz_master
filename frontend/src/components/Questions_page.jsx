import React from "react";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { NextArrow, PrevArrow } from "./Slider_Arrows";
import { Button, ButtonBase } from "@mui/material";
import axios from "axios";
import { USERS } from "../End_points";
import { useContext } from "react";
import { Authcontext } from "../context_API";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

function Questions_page() {
  const { token, user_id } = useContext(Authcontext);
  const [question, setQuestion] = useState([]);
  const [options, setOptions] = useState([]);
  const [attemptId, setAttemptId] = useState();
  const [restquestions, setRestQuestions] = useState([]);
  const [restquestionsoption, setRestQuestionsOption] = useState([]);
  const [score, setScore] = useState();

  const params = useParams();

  const [searchParams] = useSearchParams();

  const isResume = searchParams.get("resume") === "true";

  const { categoryid, levelId } = params;

  const navigate = useNavigate();
  const Get_All_Question = async () => {
    try {
      const res = await axios.get(
        `${USERS.GET_ALL_QUESTION}/${categoryid}/${levelId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const details = res?.data?.data;
      const question = details?.all_questions;
      const options = details?.All_options;

      setQuestion(question);
      setOptions(options);
    } catch (error) {
      console.log(error);
    }
  };

  const Quizz_attempt = async () => {
    try {
      const res = await axios.get(`${USERS.ATTEMPT_QUIZZ_ID}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { categoryid: categoryid, levelId: levelId },
      });
      console.log(res, "dss");
      setAttemptId(res?.data?.data?.id);
    } catch (error) {
      console.log(error);
    }
  };

  const Resume_quizz = async () => {
    try {
      const res1 = await axios.get(`${USERS.CONTINUE_QUESTION}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { categoryid: categoryid, levelId: levelId },
      });
      console.log(res1, "question");

      setRestQuestions(res1?.data?.data?.filtered_question);
      setRestQuestionsOption(res1?.data?.data?.All_options);
    } catch (error) {
      console.log(error);
    }
  };

  const select_option = async (optionId, is_correct, question_id) => {
    try {
      const res = await axios.post(
        `${USERS.SELECT_OPTION_ADD_IN_ANSWERTABLE}`,
        {
          user_id: user_id,
          selected_option_id: optionId,
          is_correct: is_correct,
          question_id: question_id,
          attempt_id: attemptId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove answered question
      if (!isResume) {
        const updated = question.filter((q) => q.id !== question_id);
        setQuestion(updated);

        // ✅ check if all questions done
        if (updated.length === 0) {
          await Complete_quizz();
        }
      }

      if (isResume) {
        const updated = restquestions.filter((q) => q.id !== question_id);
        setRestQuestions(updated);

        if (updated.length === 0) {
          await Complete_quizz();
        }
      }

      const res1 = await axios.post(
        `${USERS.RESULT}`,
        { attempt_id: attemptId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res1, "checkresult");
      setScore(res1?.data?.data?.Get_result?.score);

      // If this was the last question, mark quiz as completed
      if (isResume && restquestions.length === 1) {
        await Complete_quizz();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Complete_quizz = async () => {
    const paylod = {
      completed_at: new Date().toISOString(),
      status: "completed",
    };
    try {
      const res1 = await axios.put(`${USERS.COMPLETE_QUIZZ}`, paylod, {
        headers: { Authorization: `Bearer ${token}` },
        params: { categoryid: categoryid, levelId: levelId },
      });
      setQuestion([]);
      setRestQuestions([]);
      setOptions([]);
      setRestQuestionsOption([]);
    } catch (error) {
      console.log(error);
    }
  };

  const Re_Quizz_attempt = async () => {
    const paylod = {
      user_id: user_id,
      category_id: categoryid,
      level_id: levelId,
    };

    try {
      const res1 = await axios.post(`${USERS.ATTEMPT_QUIZZ}`, paylod, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Get_All_Question();
      navigate(`/question_page/${categoryid}/${levelId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const mergedQuestions = useMemo(() => {
    if (isResume) {
      const unique = new Map();
      restquestions.forEach((q) => {
        if (!unique.has(q.id)) {
          unique.set(q.id, {
            ...q,
            options: restquestionsoption.filter(
              (opt) => opt.question_id === q.id
            ),
          });
        }
      });
      return Array.from(unique.values());
    } else {
      const unique = new Map();
      question.forEach((q) => {
        if (!unique.has(q.id)) {
          unique.set(q.id, {
            ...q,
            options: options.filter((item) => item.question_id === q.id),
          });
        }
      });
      return Array.from(unique.values());
    }
  }, [question, options, restquestionsoption, restquestions]);

  const go_home = () => {
    navigate("/");
  };
  useEffect(() => {
    if (isResume) {
      Resume_quizz();
    } else {
      Get_All_Question();
    }
    Quizz_attempt();
  }, [isResume, categoryid, levelId]);

  useEffect(() => {
    console.log(score, "score");
  }, [score]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: null,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const firstUnansweredId = restquestions?.[0]?.id;

  const initialSlideIndex = useMemo(() => {
    return mergedQuestions.findIndex((q) => q.id === firstUnansweredId);
  }, [mergedQuestions, restquestions]);

  return (
    <div className="slider-container">
      {mergedQuestions.length > 0 ? (
        <Slider
          {...settings}
          initialSlide={initialSlideIndex >= 0 ? initialSlideIndex : 0}
        >
          {mergedQuestions.map((item, index) => {
            return (
              <div key={index}>
                <h3 className="text-center">{item.question_text}</h3>
                <div className="options-grid">
                  {item.options?.map((option, i) => (
                    <Button
                      className="option-box"
                      key={i}
                      onClick={() => {
                        select_option(
                          option.id,
                          option.is_correct,
                          option.question_id
                        );
                        // filterQuestion(option.question_id);
                      }}
                    >
                      {option.option_text}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="text-center mt-5">
          <p> Your Score:{score} </p>
          <Button variant="contained" onClick={Re_Quizz_attempt}>
            Try again
          </Button>
          <br></br>
          <Button sx={{mt:3}} variant="contained" onClick={go_home}>
            Go to HomePage
          </Button>
        </div>
      )}
    </div>
  );
}
export default Questions_page;
