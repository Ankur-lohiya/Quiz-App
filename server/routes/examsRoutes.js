const express = require("express");
const router = express.Router();
const jwtauth = require("../middlewares/jwtauth");
const Exam = require("../models/examModels");
const Question = require("../models/questions");
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

router.post("/exam-by-id/", jwtauth, async (req, res) => {
  try {
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

//update exam
router.post("/edit-exam-by-id", jwtauth, async (req, res) => {
  try {
    await Exam.findByIdAndUpdate(req.body.examId, req.body);
    res.send({
      message: "Exam updated successfully",
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

// Delete Exam
router.post("/delete-exam-by-id", jwtauth, async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.body.examId);
    res.send({
      message: "Exam deleted successfully",
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

// add question to exam
router.post("/add-question", jwtauth, async (req, res) => {
  try {
    // console.log(req.body);
    const newquestion = new Question(req.body);
    const question = await newquestion.save();
    const exam = await Exam.findById(req.body.examId);
    console.log("exam",exam.questions,"question",question._id);
    exam.questions.push(question._id);
    await exam.save();
    res.status(200).send({
      message: "Question added successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Something went wrong",
      data: err,
      success: false,
    });
  }
});
// edit questions in exam
router.post("/edit-question-in-exam", jwtauth, async (req, res) => {
  try {
    await Question.findByIdAndUpdate(req.body.questionId, req.body);
    res.send({
      message: "Question updated successfully",
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

//delete question
router.post("/delete-question-in-exam", jwtauth, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.body.questionId);
    const exam = await Exam.findById(req.body.examId);
    exam.questions = exam.questions.filter((question) => {
      return question._id != req.body.questionId;
    });
    await exam.save();
    res.send({
      message: "Question deleted successfully",
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
