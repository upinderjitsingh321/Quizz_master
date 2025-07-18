import * as React from "react";
import Box from "@mui/material/Box";
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

const schema = yup.object().shape({
  email: yup.string().required("Please enter your email"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function Reset_Password() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    const payload = {
      email: data.email,
    };

    try {
      const res = await axios.post(`${USERS.FORGOT_PASSWORD}`, payload);

      console.log(res, "resss");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Forgot Password</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              className="pb-4 w-75"
              type="email"
              id="standard-basic"
              label="Email"
              variant="standard"
              {...register("email")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <br></br>
            <Button
              className="border border-5 border-primary"
              variant="contained"
              type="submit"
            >
              Send Mail
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
