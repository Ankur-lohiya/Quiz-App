const express = require("express");
const jwtauth = require("../middlewares/jwtauth");
const router = express.Router();
const Report = require("../models/reportModel");
const Exam = require("../models/examModels");
const User = require("../models/user");

router.post("/add-report", jwtauth, async (req, res) => {
  try {
    const report = new Report(req.body);
    const check = await report.save();
    console.log("line 11", check);
    res.status(200).send({
      message: "Attempt added successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

router.post("/get-all-reports", jwtauth, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.body.userId })
      .populate("exam")
      .populate("user");
    res.send({
      message: "Reports fetched successfully",
      data: reports,
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

router.post("/get-reports-by-user", jwtauth, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const reports = await Report.find({ user: user._id });
    const exams = await Exam.find({
      _id: { $in: reports.map((report) => report.exam) },
    });
    const data = reports.map((report) => {
      const exam = exams.find(
        (exam) => exam._id.toString() === report.exam.toString()
      );
      console.log("report", report, "exam", exam);
      const returnData = {
        _id: report._id,
        examName: exam.name,
        date: report.createdAt,
        result: report.result,
        totalQuestions: exam.questions.length,
        verdict: report.result.verdict,
      };
      console.log("return data", returnData);
      return returnData;
    });
    res.status(200).send({
      message: "Reports fetched successfully",
      data: data,
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

module.exports = router;
