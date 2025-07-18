import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function About_Page() {
  const content = [
    {
      title: "What We Offer",
      description: "With QuizMaster, you can:",
      list: [
        "Take Private Quizzes assigned by your teacher or admin",
        "Track Your Performance in real-time",
        "Review Answers and learn from mistakes",
        "Instant Feedback on correct and wrong answers",
        "Secure Logins for both students and admins",
      ],
    },
    {
      title: "Why We Built QuizMaster",
      description:
        "Learning in the classroom often lacks instant feedback and progress tracking.",
      list: [
        "Admins create custom quizzes",
        "Students answer questions in real time",
        "Everyone sees progress instantly",
      ],
      para1: "We wanted to solve that.",
      para2: "So, we built QuizMaster — a simple yet powerful tool where:",
      para3:
        "Whether it’s for schools, coaching centers, or self-practice, QuizMaster helps you learn better.",
    },
  ];
  return (
    <>
      <h2 className="text-center">ABOUT US</h2>
      <div className="text-center mb-4">
        <p className="descript">
          Welcome to QuizMaster, your personalized online quiz platform designed
          for students and teachers.
        </p>

        <p className="descript">
          We believe learning should be fun, interactive, and measurable — and
          that’s exactly what QuizMaster delivers.
        </p>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {content.map((item, index) => (
            <Grid className="grid_conatiner" key={index} size={{ md: 6 }}>
              <Item>
                <div className="conatiner">
                  <h4 className="fw-bold mb-4">{item.title}</h4>
                  <p className="fs-5">{item.description}</p>
                  <div className="text-start ps-4 ms-4">

                  <p className="fs-5">{item.para1}</p>
                  <p className="fs-5">{item.para2}</p>
                  </div>
                  <div className="ul_container">
                    <ul className="list-unstyled">
                      {item.list.map((point, index) => (
                        <li className="list_style" key={index}>
                          {point}
                        </li>
                        
                      ))}
                    </ul>
                  </div>
                  <p className="fs-5">{item.para1}</p>

                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
