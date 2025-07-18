import React from "react";
import { Link } from "react-router-dom";

const Admin_Navbar = () => {
  return (
    <div>
      <nav>
        <ul className="admin_bar">
             <Link to={"/"} className="list_style">
          <li className="color_list">Home</li>
          </Link>
          <Link className="list_style" to={"/admin_add_question"}>
            <li className="color_list">Add Question</li>
          </Link>
          <Link className="list_style" to={"/question_list"}>
            <li className="color_list">Questions</li>
          </Link>
           <Link className="list_style" to={"/user_list"}>
          <li className="color_list">Users </li>
          </Link>
           <Link className="list_style" to={"/leaderboard"}>
          <li className="color_list">Leaderboard </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Admin_Navbar;
