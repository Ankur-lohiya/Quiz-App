const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examsRoutes");
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/report", reportRoutes);


const port = process.env.PORT || 5000;
const dbconfig = require("./config/dbconfig");
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
