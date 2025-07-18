import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { USERS } from "../End_points";
import { useContext } from "react";
import { Authcontext } from "../context_API";
import { useEffect } from "react";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "question_text", label: "Questions", minWidth: 100 },
  {
    id: "category_id",
    label: "Category",
    minWidth: 170,
  },
  {
    id: "level_id",
    label: "Level",
    minWidth: 170,
  },
];

export default function Questions_List() {
  const [list, setList] = React.useState([]);
  const [getcategory, setGetCategory] = useState([]);
  const [totalpage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const { token } = useContext(Authcontext);

  const Question_list = async () => {
    try {
      const res = await axios.get(`${USERS.QUESTIONS_LIST}?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res, "resdd");

      const data = res?.data?.data;
      setTotalPage(data?.totalpage);
      setList(data?.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const Get_catagories = async () => {
    try {
      const res = await axios.get(`${USERS.GET_CATEGORY}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const catagory = res?.data?.data?.category;
      setGetCategory(catagory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Question_list(), Get_catagories();
  }, [page]);

  useEffect(() => {
    console.log(list, getcategory, "list");
  }, [list, getcategory]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "rgb(76 136 206)",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    let value = item[column.id];

                    if (column.id === "level_id") {
                      const levelMap = {
                        1: "Easy",
                        2: "Average",
                        3: "Hard",
                      };
                      value = levelMap[value] || "Unknown";
                    }

                    if (column.id === "category_id") {
                      const category = getcategory.find((cat) => {
                        return cat.id === value;
                      });
                      value = category ? category.name : "Unknown";
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Stack spacing={2}>
          <Pagination
            count={totalpage}
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </TableContainer>
    </Paper>
  );
}
