import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { USERS } from "../End_points";
import { toast } from "react-toastify";
import SignUp from "./Signup";
import { useContext } from "react";
import { Authcontext } from "../context_API";
import { useState } from "react";
import { useEffect } from "react";
import Reset_Password from "./reset_password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  email: yup.string().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

export default function Login({ openlogin, onClose }) {
  const [opensignup, setOpenSignup] = React.useState(false);
  const { login } = useContext(Authcontext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: Object.keys(errors).length > 0 ? 450 : 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  const submit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(`${USERS.LOGIN}`, payload);
      console.log(res, "resss");
      const token = res.data?.data?.token;
      const role = res.data?.data?.Log_data?.role;
      const id = res.data?.data?.Log_data?.id;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user_id", id);
      login(token, role, id);
      navigate("/");
      toast.success("Login successfully");
    } catch (error) {
      console.log(error);
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      }
      if (error?.response) {
        toast.error(error?.response?.data?.data);
      }
    }
  };

  return (
    <div>
      <Modal
        open={openlogin}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {opensignup && (
            <SignUp
              opensignup={opensignup}
              onClose={() => setOpenSignup(false)}
            />
          )}
          <form onSubmit={handleSubmit(submit)} className="text-start ms-5">
            <p className="text-center fw-bold fs-4">LogIn</p>

            <TextField
              className="pb-4 w-75"
              type="email"
              id="standard-basic"
              label="Email"
              variant="standard"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              className="pb-4 mb-3 w-75"
              type={show ? "text" : "password"}
              id="standard-basic"
              label="Password"
              variant="standard"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button>
              {!show ? (
                <VisibilityOffIcon onClick={() => setShow(true)} />
              ) : (
                <VisibilityIcon onClick={() => setShow(false)} />
              )}
            </Button>

            <br></br>
            <Button
              className="border border-5 border-primary"
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </form>
          <p>
            Not have an account?{" "}
            <Button onClick={() => setOpenSignup(true)}>SignUp</Button>{" "}
          </p>
          <Reset_Password />
        </Box>
      </Modal>
    </div>
  );
}
