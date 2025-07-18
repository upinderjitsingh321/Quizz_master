require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const Routes = require("./Routes/index");
const path = require("path");

app.use(cors({
  origin: 'http://localhost:5173', // or use '*' to allow all origins (only for development)
  credentials: true,
}));
app.use("/api", Routes);
app.use("/Upload",   express.static(path.join(__dirname, "Upload"))),


app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
