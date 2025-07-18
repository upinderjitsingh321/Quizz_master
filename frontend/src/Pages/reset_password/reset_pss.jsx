import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { USERS } from "../../End_points";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./style.css"; 
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${USERS.RESET_PASSWORD}/${token}`, {
        newPassword,
      });

      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="Main_container mt-5 d-flex justify-content-center align-items-center flex-column">
      <h2 className="text-center mb-4">Reset Your Password</h2>

      {message && <div className="alert alert-info w-50 text-center">{message}</div>}

      <form onSubmit={handleReset} className="w-50 text-center">
        <div className="mb-4 position-relative">
          <label className="form-label">New Password</label>
          <div className="input-group text-center">
            <input
              type={showNew ? "text" : "password"}
              className="textcenter"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span className="input-group-text cursor-pointer" onClick={() => setShowNew((prev) => !prev)}>
              {showNew ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
        </div>

        <div className="mb-4 position-relative">
          <label className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirm ? "text" : "password"}
              className="textcenter"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="input-group-text cursor-pointer" onClick={() => setShowConfirm((prev) => !prev)}>
              {showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
