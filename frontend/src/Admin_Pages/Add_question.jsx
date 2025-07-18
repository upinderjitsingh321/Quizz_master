import React, { useEffect, useState } from "react";
import "./style.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { USERS } from "../End_points";
import { useContext } from "react";
import { Authcontext } from "../context_API";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  categoryname: yup.string(),
});

function Admin_Add_Question() {
  const [level, setLevel] = useState([]);
  const [getcategory, setGetCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {Select_level, token } = useContext(Authcontext);

  const Submit = async () => {
    const finalCategory = newCategory.trim() ? newCategory : category;

    if (!finalCategory || !difficulty) {
      alert("Please select or enter a category and choose a difficulty");
      return;
    }

    const formData = new FormData();
    formData.append("name", finalCategory);
    formData.append("file", file);
    formData.append("difficulty", difficulty);

    if (newCategory) {
      try {
        const res = await axios.post(`${USERS.CATEGORY_LEVEL}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(res.data, "ressss");
        // console.log(res?.data?.data?.getcategory?.id, "ressss");
        const category_id = res?.data?.data?.getcategory?.id;
        
        if (difficulty && category_id) {
          navigate(`/add_question/${difficulty}/${category_id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (difficulty && category) {
        navigate(`/add_question/${difficulty}/${category}`);
      } else {
        alert("categoryTosend is missing");
      }
    }
  };


  console.log(Select_level,"seletlevel");
  
  const Get_catagories = async () => {
    try {
      const res = await axios.get(`${USERS.GET_CATEGORY}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const catagory = res?.data?.data?.category;
      const level = res?.data?.data?.level;
      console.log(level,"level--->")
      setGetCategory(catagory);
      setLevel(level);
      Select_level(level)
       
    } catch (error) {
      console.log(error);
    }
  };

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

  console.log(difficulty, "level");
  console.log(category, "lecategoryvel");
  console.log(newCategory, "lecategoryvel");

  useEffect(() => {
    Get_catagories();
  }, []);
  useEffect(() => {
    console.log(getcategory, level, "getcategory");
  }, [getcategory, level]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(Submit)}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" textAlign="center">
        Add Question Setup
      </Typography>

      <FormControl fullWidth size="small" sx={{ marginBottom: "40px" }}>
        <InputLabel id="category-select-label">Select Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Select Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {getcategory.map((item, index) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Or Enter New Category"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ marginBottom: "40px" }}
        {...register("categoryname")}
        error={!!errors.categoryname}
        helperText={errors.categoryname?.message}
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        sx={{ marginBottom: "40px" }}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
          multiple
        />
      </Button>

      <FormControl fullWidth size="small" sx={{ marginBottom: "40px" }}>
        <InputLabel id="difficulty-select-label">Select Difficulty</InputLabel>
        <Select
          labelId="difficulty-select-label"
          id="difficulty-select"
          value={difficulty}
          label="Select Difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {level.map((item, index) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Proceed to Add Questions
      </Button>
    </Box>
  );
}

export default Admin_Add_Question;
