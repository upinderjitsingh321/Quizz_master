import React, { Children } from "react";
import Admin_Navbar from "../Navbars/Admin_Navbar";
import "./style.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../context_API";
const Layout = ({ children }) => {
  const { logout } = useContext(Authcontext);
  return (
    <div>
      <div className="grid_container">
        <nav className="side_bar">
          <Admin_Navbar />
        </nav>

        <div className="text-center">
          <header className="main_container">
            <ul className="container">
              <Button
                variant="contained"
                onClick={logout}
                sx={{
                  backgroundColor: "	#00BFFF",
                  color: "white",
                  "&:hover": { backgroundColor: "#00a5da" },
                }}
              >
                Logout
              </Button>
              <Link to={"/profile"}>
                <Button
                  sx={{
                    backgroundColor: "	#00BFFF",
                    color: "white",
                    "&:hover": { backgroundColor: "#00a5da" },
                  }}
                  variant="contained"
                >
                  Profile
                </Button>
              </Link>
            </ul>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
