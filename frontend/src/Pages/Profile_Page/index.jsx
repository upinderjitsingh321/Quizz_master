import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Slider,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { USERS } from "../../End_points";
import axios from "axios";
import { Authcontext } from "../../context_API";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./style.css";
import Forgot_Password from "../../Models/Forgot_Password";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { toast } from "react-toastify";
const schema = yup.object().shape({
  name: yup.string().required("Please enter your email"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/)
    .required("Please enter your password"),
  email: yup.string(),
  score: yup.number(),
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile_page = () => {
  const { token, role } = useContext(Authcontext);
  const [progress, setProgress] = useState([]);
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState("");
  const [openpassword, setOpenPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // practice time

  const numbers = [4, 10, 15, 23, 8, 19];
  const findNumber = numbers.filter((item) => item > 10).sort((a, b) => a - b);

  const marks = [90, 87, 75, 100, 95];
  const totalmarks = marks.reduce((acc, item) => {
    return acc + item;
  }, 0);

  const items = [
    { category: "fruit", name: "apple" },
    { category: "vegetable", name: "carrot" },
    { category: "fruit", name: "banana" },
    { category: "vegetable", name: "spinach" },
    { category: "grain", name: "rice" },
  ];
  const filteritem = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
  }, {});

  const products = [
    { id: 1, name: "Phone" },
    { id: 2, name: "Laptop" },
    { id: 3, name: "Tablet" },
    { id: 4, name: "Watch" },
    { id: 5, name: "Camera" },
    { id: 6, name: "Headphones" },
    { id: 7, name: "TV" },
    { id: 8, name: "Printer" },
    { id: 9, name: "Mouse" },
    { id: 10, name: "Keyboard" },
    { id: 11, name: "Monitor" },
    { id: 12, name: "Speaker" },
    { id: 13, name: "Router" },
    { id: 14, name: "Scanner" },
    { id: 15, name: "Gamepad" },
    { id: 16, name: "Gamepad" },
    { id: 17, name: "Gamepad" },
  ];

  function paginate(array, pageNumber, itemsPerPage) {
    // logic
    const startindex = (pageNumber - 1) * itemsPerPage;
    const endindex = startindex + itemsPerPage;
    return array.slice(startindex, endindex);
  }

  const page2 = paginate(products, 2, 5);

  function searchProducts(array, keyword) {
    return array.filter((item) =>
      item.name.toLowerCase().startsWith(keyword.toLowerCase())
    );
  }
  const result = searchProducts(products, "ph");

  function getFilteredAndPaginated(array, keyword, pageNumber, itemsPerPage) {
    // Step 1: Filter
    const filtered = array.filter((item) =>
      item.name.toLowerCase().startsWith(keyword.toLowerCase())
    );
    // Step 2: Paginate
    const startindex = (pageNumber - 1) * itemsPerPage;
    const endindex = startindex + itemsPerPage;
    const paginated = filtered.slice(startindex, endindex);

    // Step 3: Return result
    return paginated;
  }

  const result1 = getFilteredAndPaginated(products, "ph", 1, 5);

  console.log(result1, "findnumber");

  const User_details = async () => {
    try {
      const res = await (role === "student"
        ? axios.get(`${USERS.GET_USER_DETAILS}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : axios.get(`${USERS.ADMIN_USER_DETAILS}`, {
            headers: { Authorization: `Bearer ${token}` },
          }));

      console.log(res, "rs");
      if (role === "student") {
        const score = res?.data?.data?.personal_data?.results;
        const Profie = res?.data?.data?.personal_data?.image;
        console.log("profile", Profie);

        setProfile(Profie);
        const total_score = score.reduce((acc, item) => {
          return acc + item.score;
        }, 0);
        console.log(total_score, "totalxore");

        reset({
          name: res?.data?.data?.personal_data?.name,
          email: res?.data?.data?.personal_data?.email,
          phone: res?.data?.data?.personal_data?.phone,
          score: total_score,
        });
      } else {
        reset({
          name: res?.data?.data?.personal_data?.name,
          email: res?.data?.data?.personal_data?.email,
          phone: res?.data?.data?.personal_data?.phone,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("file", file);
    formData.append("phone", data.phone);
    try {
      const res = await (role === "student"
        ? axios.post(`${USERS.UPDATE_USER_DETAILS}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : axios.post(`${USERS.UPDATE_ADMIN_DETAILS}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          }));

      toast.success("Profile is update");
    } catch (error) {
      console.log(error);
    }
  };

  const Check_Status = async () => {
    try {
      const res = await axios.get(`${USERS.CHECK_STATUS}?_=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Filter_status:", res?.data?.data?.Filter_status);

      if (Array.isArray(res?.data?.data?.Filter_status)) {
        const filtered = res.data.data.Filter_status.filter(
          (q) => q.status === "in_progress"
        );
        setProgress(filtered);
      } else {
        setProgress([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleRefresh = () => {
  //   setProgress([]);
  //   Check_Status();
  // };

  const Clear_All_quizz = async () => {
    const paylod = {
      completed_at: new Date().toISOString(),
      status: "completed",
    };

    try {
      const res1 = await axios.put(`${USERS.CLEAR_ALL_QUIZZ}`, paylod, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res1, "res1ss");
      Check_Status();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFile(file);

    if (file) {
      const localPreview = URL.createObjectURL(file);

      setPreviewUrl(localPreview);
    }
    setTimeout(() => {
      submit();
    }, 2000);
  };
  const handleResumeClick = (categoryId, levelId) => {
    navigate(`/question_page/${categoryId}/${levelId}?resume=true`);
  };

  useEffect(() => {
    Check_Status();
    User_details();
  }, [reset]);
  useEffect(() => {
    console.log(profile, "profilesss");
  }, [profile]);

  return (
    <Box sx={{ p: 5 }}>
      {/* Resume Quiz Section */}
      {role === "student" ? (
        <Paper elevation={3} style={{ margin: "0 130px", padding: "50px" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              🕒{" "}
              {progress.length
                ? "Quizzes You Left In Between"
                : "There is no Quizz Pending"}
            </Typography>
            {progress.length ? (
              <Button variant="outlined" onClick={Clear_All_quizz}>
                Clear All Quizz
              </Button>
            ) : (
              ""
            )}
          </Box>

          {progress.map((item, index) => (
            <Box
              key={`${item.category_id}-${item.level_id}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              {progress.length ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleResumeClick(item.category_id, item.level_id)
                  }
                >
                  Resume Quiz
                </Button>
              ) : (
                ""
              )}
            </Box>
          ))}
        </Paper>
      ) : (
        ""
      )}

      {/* Profile Form Section */}
      <Paper elevation={3} style={{ margin: "50px 130px", padding: "50px" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={previewUrl || `http://localhost:8001/Upload/${profile}`}
            sx={{ width: 100, height: 100 }}
          />
          <Button
            sx={{ ml: 1 }}
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<CameraAltIcon />}
          >
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
          </Button>
          <Typography variant="h6">My Profile</Typography>
        </Box>
        {openpassword && (
          <Forgot_Password
            openpassword={openpassword}
            onClose={() => setOpenPassword(false)}
          />
        )}
        <Box
          onSubmit={handleSubmit(submit)}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                // label="First Name"
                variant="standard"
                fullWidth
              />
              <p>First Name</p>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                // label="Phone"
                type="telephone"
                placeholder="Phone"
                variant="standard"
                fullWidth
              />
              <p> Phone</p>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("email")}
                // label="Email Address"
                variant="standard"
                fullWidth
              />
              <p> Email Address</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              {role === "student" ? (
                <TextField
                  {...register("score")}
                  // label="Score"
                  variant="standard"
                  fullWidth
                />
              ) : (
                ""
              )}
              {role === "student" ? <p> Score</p> : ""}
            </Grid>
          </Grid>
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button variant="contained" onClick={() => setOpenPassword(true)}>
              Change Password
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile_page;
