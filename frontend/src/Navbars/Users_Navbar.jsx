import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LogoutIcon from "@mui/icons-material/Logout";
import User from "./../assets/user.png";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../context_API";
import { Button, Grid, Menu, MenuItem } from "@mui/material";
import { USERS } from "../End_points";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
export default function User_Navbar() {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { logout, token } = useContext(Authcontext);
  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const User_details = async () => {
    try {
      const res = await axios.get(`${USERS.GET_USER_DETAILS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res, "ress...");
      setName(res?.data?.data?.personal_data?.name);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate("/profile");
  };
  useEffect(() => {
    User_details();
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Grid container spacing={115}>
            <Grid item xs={12} sm={6}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  icon={<HomeIcon />}
                  iconPosition="start"
                  label="Home"
                  value="/"
                  component={Link}
                  to="/"
                />
                <Tab
                  icon={<AssignmentTurnedInIcon />}
                  iconPosition="start"
                  label="Select Quizz"
                  value="/select_quiz"
                  component={Link}
                  to="/select_quiz"
                />
                <Tab
                  icon={<LeaderboardIcon />}
                  iconPosition="start"
                  label="Leaderboard"
                  value="/leaderboard"
                  component={Link}
                  to="/leaderboard"
                />
               
              </TabList>
            </Grid>
            <Grid container justifyContent={"right"} alignItems="center">
              <Button onClick={handleClick}>
                <img src={User} alt="user" width={30} height={30} />
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem className="text-primary my-2">Hii, {name}</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <AccountCircleIcon className="me-3" /> Profile
                </MenuItem>
                <MenuItem onClick={logout}>
                  {" "}
                  <LogoutIcon className="me-3"/>
                  Log Out
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Box>
      </TabContext>
    </Box>
  );
}
