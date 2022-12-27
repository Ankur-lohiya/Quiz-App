const express = require("express");
const router = express.Router();
const jwtauth = require("../middlewares/jwtauth");
const Exam = require("../models/examModels");

//add exams
router.post("/add", jwtauth, async (req, res) => {
  try {
    // check for exam name already exists
    const examNameCheck = await Exam.findOne({ name: req.body.name });
    if (examNameCheck) {
      return res.status(400).send({
        message: "Exam name already exists",
        success: false,
      });
    }
    req.body.questions = [];
    console.log(req.body);
    const exam = new Exam(req.body);
    await exam.save();
    res.status(200).send({
      message: "Exam added successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
      data: err,
      success: false,
    });
  }
});

//get all exams
router.post("/all-exams", jwtauth, async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.status(200).send({
      message: "Exams fetched successfully",
      data: exams,
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

router.post("/exam-by-id/", jwtauth, async(req, res) => {
  try {
       console.log(req.body.examId);
      const exams = await Exam.findById(req.body.examId);
      // console.log(exams);
    res.status(200).send({
      message: "Exams fetched successfully",
      data: exams,
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
