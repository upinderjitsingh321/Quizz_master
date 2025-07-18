import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import SignUp from "../Models/Signup";
import Login from "../Models/login";
export default function Public_Navbar() {
  const location = useLocation();
  const [opensignup, setOpenSignup] = React.useState(false);
  const [openlogin, setOpenLogin] = React.useState(false);
  const [value, setValue] = React.useState(location.pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {opensignup && (
        <SignUp opensignup={opensignup} onClose={() => setOpenSignup(false)} />
      )}
      {openlogin && (
        <Login openlogin={openlogin} onClose={() => setOpenLogin(false)} />
      )}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              icon={<HomeIcon />}
              iconPosition="start"
              label="Home"
              value="/"
              component={Link}
              to="/"
            />
            <Tab
              icon={<PersonIcon />}
              iconPosition="start"
              label="SignUp"
              value="/signUp_modal"
              onClick={() => setOpenSignup(true)}
            />
            <Tab
              icon={<LoginIcon />}
              iconPosition="start"
              label="LogIn"
              value="logIn_model"
              onClick={() => setOpenLogin(true)}
            />
            {/* <Tab
              icon={<InfoIcon />}
              iconPosition="start"
              label="About"
              value="/about"
              component={Link}
              to="/about"
            /> */}
            {/* <Tab
              icon={<AdminPanelSettingsIcon />}
              iconPosition="start"
              label="Admin"
              value="/admin"
              component={Link}
              to="/admin"
            /> */}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
