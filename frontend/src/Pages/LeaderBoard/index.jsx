import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { USERS } from "../../End_points";
import { useContext } from "react";
import { Authcontext } from "../../context_API";
import { useEffect } from "react";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(76 136 206)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {},
}));

export default function LeaderBoard() {
  const { token, role } = useContext(Authcontext);
  const [score, setScore] = useState([]);
  const User_positions = async () => {
    try {
      const res = await (role === "student"
        ? axios.get(`${USERS.LEADERBOARD}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : axios.get(`${USERS.ADMIN_LEADERBOARD}`, {
            headers: { Authorization: `Bearer ${token}` },
          }));
      const all_Rows = res?.data?.data?.leaderchart;
      const Sort_By_Score = all_Rows.sort((a, b) => {
        return b.total_score - a.total_score;
      });

      console.log(Sort_By_Score, "Sort_By_Score");

      setScore(Sort_By_Score);

      console.log(res, "position");
    } catch (error) {
      console.log(error);
    }
  };
  const maskEmail = (email) => {
    if (!email) return "";

    const [name, domain] = email.split("@");
    const visiblePart = name.slice(0, 2); // show first 2 letters
    return `${visiblePart}****@${domain}`;
  };

  useEffect(() => {
    User_positions();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table
        sx={{ margin: "auto"}}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: "20%" }}>Id</StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }} align="left">
              Email
            </StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }} align="left">
              Name
            </StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }} align="left">
              Score
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {score.map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell sx={{ width: "20%" }} component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }} align="left">
                {maskEmail(row.user?.email)}
              </StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }} align="left">
                {row.user?.name}
              </StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }} align="left">
                {row.total_score}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
