import React, { useEffect } from "react";
import "./style.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { Authcontext } from "../../context_API";
import axios from "axios";
import { USERS } from "../../End_points";
import { useState } from "react";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";

function Diffculty_level() {
  const { token, user_id } = useContext(Authcontext);
  console.log(user_id, "user_id");

  const [levels, setLevels] = useState([]);
  const { categoryid } = useParams();

  const navigate = useNavigate();
  const Get_Levels = async () => {
    try {
      const res = await axios.get(`${USERS.GET_LEVELS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res?.data?.data?.Level_data;
      setLevels(data);
    } catch (error) {
      console.log(error);
    }
  };

  const Quizz_attempt = async (levelId) => {
    const paylod = {
      user_id: user_id,
      category_id: categoryid,
      level_id: levelId,
    };

    try {
      const res1 = await axios.post(`${USERS.ATTEMPT_QUIZZ}`, paylod, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/question_page/${categoryid}/${levelId}`);
    } catch (error) {
      console.log(error);

      if (error.response?.data?.data?.errorCode === "duplicateEntry") {
        toast.info(
          "You already join this quizz go to your profile page and continue"
        );
      }
    }
  };

  useEffect(() => {
    Get_Levels();
  }, []);
  useEffect(() => {
    console.log(levels, "levels page");
  }, [levels]);

  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 5, width: "60ch" } }}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        alignItems="center"
      ></Box>
      <div className="text-center conatiner">
        <h2 className="mb-5">Select the difficulty of the quiz</h2>

        {levels.map((item, index) => (
          <button
            key={item.id}
            className="button_design"
            onClick={() => {
              Quizz_attempt(item.id);
              // Submit_Button(item.id);
            }}
          >
            {item.name.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}

export default Diffculty_level;
