import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import About_Page from "./Pages/About";
import Select_Quizz from "./Pages/Quizz_catagories";
import Diffculty_level from "./Pages/Difficulty_level";
import Questions_page from "./components/Questions_page";
import LeaderBoard from "./Pages/LeaderBoard";
import Profile_page from "./Pages/Profile_Page";
import Add_Question from "./Pages/Add_Question";
import Users_List from "./Admin_Pages/Users_List";
import { useContext } from "react";
import { Authcontext } from "./context_API";
import Admin_Add_Question from "./Admin_Pages/Add_question";
import Questions_List from "./Admin_Pages/Question_List";
import QuizMasterHomepage from "./Pages/Home_Page/Index";
import ResetPasswordPage from "./Pages/reset_password/reset_pss";
function All_Routes() {
  const { role } = useContext(Authcontext);

  console.log(role, "role");
  console.log("enter herrerer in cnoncfition");
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={role !== "admin" && <QuizMasterHomepage />}
        />
       
        <Route
          path="/select_quiz"
          element={
            role === "student" ? <Select_Quizz /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/choose_level/:categoryid"
          element={
            role === "student" ? <Diffculty_level /> : <Navigate to="/" />
          }
        />
        <Route
          path="/question_page/:categoryid/:levelId"
          element={
            role === "student" ? <Questions_page /> : <Navigate to="/" />
          }
        />
        <Route
          path="/leaderboard"
          element={
            role === "student" || "admin" ? (
              <LeaderBoard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            role === "student" || "admin" ? (
              <Profile_page />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/add_question/:level_id/:category_id"
          element={<Add_Question />}
        />
        <Route
          path="/user_list"
          element={role === "admin" ? <Users_List /> : <Navigate to="/" />}
        />
        <Route
          path="/admin_add_question"
          element={
            role === "admin" ? <Admin_Add_Question /> : <Navigate to="/" />
          }
        />
        <Route
          path="/question_list"
          element={role === "admin" ? <Questions_List /> : <Navigate to="/" />}
        />
        <Route
          path="/reset_password/:token"
          element={!role ? <ResetPasswordPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default All_Routes;
