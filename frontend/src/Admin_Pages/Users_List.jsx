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
import { Button } from "@mui/material";
import SignUp from "../Models/Signup";

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
  },
  {
    id: "created_at",
    label: "Date",
    minWidth: 170,
    format: (value) => new Date(value).toISOString().split("T")[0],
  },
];

export default function Users_List() {
  const [list, setList] = React.useState([]);
  const [opensignup, setOpenSignup] = React.useState(false);
  const { token } = useContext(Authcontext);

  const User_list = async () => {
    try {
      const res = await axios.get(`${USERS.USERS_LIST}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res?.data?.data?.users_list;
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const Delete_User = async (id) => {
    try {
      const res = await axios.delete(`${USERS.DELETE_USER}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { id: id },
      });
      User_list();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    User_list();
  }, []);

  useEffect(() => {
    console.log(list, "list");
  }, [list]);

  return (
    <>
      {opensignup && (
        <SignUp opensignup={opensignup} onClose={()=>setOpenSignup(false)} />
      )}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Button
          className="my-3"
          variant="contained"
          onClick={() => {
            setOpenSignup(true);
          }}
        >
          Add New User
        </Button>
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
                      const value = item[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => Delete_User(item.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
