import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./style.css";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { USERS } from "../../End_points";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Authcontext } from "../../context_API";
import { useEffect } from "react";

const schema = yup.object().shape({
  question_text: yup.string().required("Please enter your question"),
  option_a: yup.string().required("Please enter your option_A"),
  option_b: yup.string().required("Please enter your option_B"),
  option_c: yup.string().required("Please enter your option_C"),
  option_d: yup.string().required("Please enter your option_D"),
  is_correct: yup.string().required("Please enter your correct option"),
});

const Add_Question = () => {
  const { token } = useContext(Authcontext);
  const { category_id, level_id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    const payload = {
      question_text: data.question_text,
      category_id: category_id,
      level_id: level_id,
    };

    try {
      const res = await axios.post(`${USERS.ADD_QUESTION}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const question_id = res?.data?.data?.question?.id;
      console.log(question_id, "question_id");

      if (!question_id) {
        toast.error("faild to get question Id");
      }

      const correct_option = data.is_correct.trim().toLowerCase();

      const options_payload = [
        {
          option_text: data.option_a,
          is_correct: data.option_a.trim().toLowerCase() === correct_option,
          question_id: question_id,
        },
        {
          option_text: data.option_b,
          is_correct: data.option_b.trim().toLowerCase() === correct_option,
          question_id: question_id,
        },
        {
          option_text: data.option_c,
          is_correct: data.option_c.trim().toLowerCase() === correct_option,
          question_id: question_id,
        },
        {
          option_text: data.option_d,
          is_correct: data.option_d.trim().toLowerCase() === correct_option,
          question_id: question_id,
        },
      ];

      const res1 = await axios.post(`${USERS.ADD_OPTIONS}`, options_payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

    

      console.log(res1, "res1");
    } catch (error) {
      console.log(error);
    }
  };



  // same thing but different way

  // const options = ["option_a", "option_b", "option_c", "option_d"];
  // const correctAnswer = data.is_correct.trim().toLowerCase();

  // const options_payload = options.map((optKey) => ({
  //   option_text: data[optKey],
  //   is_correct: data[optKey].trim().toLowerCase() === correctAnswer,
  //   question_id,
  // }));

    useEffect(() => {
        if (isSubmitSuccessful) {
          reset();
        }
      },[isSubmitSuccessful,reset]);
  return (
    <>
      <Box
        onSubmit={handleSubmit(submit)}
        component="form"
        sx={{ "& > :not(style)": { m: 5, width: "175ch" } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            {...register("question_text")}
            error={!!errors.question_text}
            helperText={errors.question_text?.message}
            style={{ width: "830px" }}
            id="question_text"
            label="Question"
            variant="outlined"
          />
        </div>
        <div className="text_input ">
          <TextField
            {...register("option_a")}
            error={!!errors.option_a}
            helperText={errors.option_a?.message}
            style={{ width: "400px" }}
            id="option_a"
            label="Option A"
            variant="outlined"
          />
          <TextField
            {...register("option_b")}
            error={!!errors.option_b}
            helperText={errors.option_b?.message}
            style={{ width: "400px" }}
            id="option_b"
            label="Option B"
            variant="outlined"
          />
        </div>
        <div className="text_input">
          <TextField
            {...register("option_c")}
            error={!!errors.option_c}
            helperText={errors.option_c?.message}
            style={{ width: "400px" }}
            id="option_c"
            label="Option C"
            variant="outlined"
          />
          <TextField
            {...register("option_d")}
            error={!!errors.option_d}
            helperText={errors.option_d?.message}
            style={{ width: "400px" }}
            id="option_d"
            label="Option D"
            variant="outlined"
          />
        </div>
        <TextField
          {...register("is_correct")}
          error={!!errors.is_correct}
          helperText={errors.is_correct?.message}
          style={{ width: "400px" }}
          id="is_correct"
          label="Correct Answer"
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          ADD
        </Button>
      </Box>
    </>
  );
};

export default Add_Question;
