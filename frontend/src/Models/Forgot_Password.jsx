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
import { useContext } from "react";
import { Authcontext } from "../context_API";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

const schema = yup.object().shape({
  newpassword: yup.string().required("Please enter your newpassword"),
  oldpassword: yup.string().required("Please enter your oldpassword"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function Forgot_Password({ openpassword, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { token, role } = useContext(Authcontext);
  const [visible, setVisible] = useState(false);
  const [oldvisible, setOldVisible] = useState(false);
  const submit = async (data) => {
    const payload = {
      oldpassword: data.oldpassword,
      newpassword: data.newpassword,
    };

    try {
      const res = await (role === "student"
        ? axios.put(`${USERS.PASSWORD_CHANGE}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : axios.put(`${USERS.ADMIN_PASSWORD_CHANGE}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          }));

      toast.success("Password change successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const Pass_visible = () => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };
  const Old_Pass_visible = () => {
    setOldVisible(true);

    setTimeout(() => {
      setOldVisible(false);
    }, 1000);
  };
  return (
    <div>
      <Modal
        open={openpassword}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(submit)}>
            <p className="text-center fw-bold fs-4">Forgot Password</p>

            <TextField
              className="pb-4 mb-3 w-75"
              type={oldvisible ? "text" : "password"}
              id="standard-basic"
              label="Old Password"
              variant="standard"
              {...register("oldpassword")}
              error={!!errors.oldpassword}
              helperText={errors.oldpassword?.message}
            />
            <button
              className="btn border-0"
              type="button"
              onClick={Old_Pass_visible}
            >
              <VisibilityIcon />
            </button>
            <TextField
              className="pb-4 mb-3 w-75"
              type={visible ? "text" : "password"}
              id="standard-basic"
              label="New Password"
              variant="standard"
              {...register("newpassword")}
              error={!!errors.newpassword}
              helperText={errors.newpassword?.message}
            />
            <button
              className="btn border-0"
              type="button"
              onClick={Pass_visible}
            >
              <VisibilityIcon />
            </button>
            <br></br>
            <Button
              className="border border-5 border-primary"
              variant="contained"
              type="submit"
            >
              Change Password
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
