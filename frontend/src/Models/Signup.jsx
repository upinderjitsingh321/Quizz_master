import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { borderRadius, textAlign } from "@mui/system";
import Login from "./login";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { USERS } from "../End_points";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../context_API";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup.string().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password should be matched")
    .required("Please enter your password"),
});

export default function SignUp({ opensignup, onClose }) {
  const [openlogin, setOpenLogin] = React.useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const navigate = useNavigate();
  const { role } = useContext(Authcontext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleLoginClick = () => {
    setTimeout(() => {
      setOpenLogin(true);
    }, 1000);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: Object.keys(errors).length > 0 ? 640 : 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const Submit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(`${USERS.SIGNUP}`, payload);
      toast.success("Your Account is Created");

      handleLoginClick();
      // {
      //   role === null || undefined ? navigate("/") : navigate("/user_list");
      // }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.data);
    }
  };

  return (
    <div>
      <Modal
        open={opensignup}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {openlogin && (
            <Login openlogin={openlogin} onClose={() => setOpenLogin(false)} />
          )}
          <form onSubmit={handleSubmit(Submit)} className="text-start ms-5">
            <p className="text-center fw-bold fs-4">SignUp</p>
            <TextField
              className="pb-4 w-75"
              id="standard-basic"
              label="Name"
              variant="standard"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              className="pb-4 w-75"
              id="standard-basic"
              type="email"
              label="Email"
              variant="standard"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              type={show ? "text" : "password"}
              className="pb-4 mb-3 w-75"
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
            <TextField
              type={show1 ? "text" : "password"}
              className="pb-4 mb-3 w-75"
              id="standard-basic"
              label="Confirm_Password"
              variant="standard"
              {...register("re_password")}
              error={!!errors.re_password}
              helperText={errors.re_password?.message}
            />
            <Button>
              {!show1 ? (
                <VisibilityOffIcon onClick={() => setShow1(true)} />
              ) : (
                <VisibilityIcon onClick={() => setShow1(false)} />
              )}
            </Button>
            <br></br>
            <Button
              className="border border-5 border-primary"
              variant="contained"
              type="submit"
            >
              Create Account
            </Button>
            <p>
              Already have an account?
              <Button onClick={handleLoginClick}>LogIn</Button>{" "}
            </p>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
