const express = require("express");
require("./db/connectdb");
const dotenv = require("dotenv");
const cors = require("cors");

const todo = require("./routes/Todo");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/todo", todo);
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
