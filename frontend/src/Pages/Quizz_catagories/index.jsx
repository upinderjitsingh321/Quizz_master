import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USERS } from "../../End_points";
import { useContext } from "react";
import { Authcontext } from "../../context_API";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function Select_Quizz() {
  const navigate = useNavigate();
  const { token } = useContext(Authcontext);
  const [categorylist, setCategorylist] = useState([]);
  const [searchbox, setSearchbox] = useState("");
  const Get_categories = async () => {
    try {
      const res = await axios.get(`${USERS.GET_CATEGORIES}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res, "rsespomse");
      const list = res?.data?.data;
      setCategorylist(list?.All_categories);
    } catch (error) {
      console.log(error);
    }
  };

  const filter_category = categorylist.filter((item) =>
    item.name.toLowerCase().includes(searchbox.toLowerCase())
  );

  useEffect(() => {
    Get_categories();
  }, []);

  const submit_botton = (id) => {
    navigate(`/choose_level/${id}`);
  };

  return (
    <div className="text-center">
      <div className="sub_conatiner">
        <h2>Check Your Knowledge</h2>
        <p className="fs-4 mt-5">Select Category</p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            margin: "35px",
          }}
        >
                    
            <Autocomplete
              options={categorylist}
              getOptionLabel={(option) => option.name}
              sx={{ width: 600 }}
              inputValue={searchbox}
              onInputChange={(event, newValue) => setSearchbox(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select category" />
              )}
            />

          {/* <input
            type="text"
            placeholder="select category "
            value={searchbox}
            onChange={(e) => setSearchbox(e.target.value)}
          /> */}
        </Box>
        <p className="fs-4">or</p>
        <p className="fs-4 mt-5">Select a Category</p>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          sx={{ marginTop: "50px" }}
          spacing={{ xs: 2, md: 5 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className="container_box"
        >
          {filter_category.map((item, index) => (
            <Grid item key={index} xs={4} sm={4} md={3}>
              <Item className="conatiner_grid">
                <Button
                  className="text-decoration-none"
                  type="button"
                  onClick={() => {
                    submit_botton(item.id);
                  }}
                >
                  <div className="d-grid">
                    <div className="">
                      <img
                        style={{ width: "125px" }}
                        src={`http://localhost:8001/Upload/${item.image}`}
                      />
                    </div>

                    <div className="name_class">{item.name}</div>
                  </div>
                </Button>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Select_Quizz;
