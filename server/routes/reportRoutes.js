const express = require("express");
const jwtauth = require("../middlewares/jwtauth");
const router = express.Router();
const Report = require("../models/reportModel");
const Exam= require("../models/examModels");
const User = require("../models/user");

router.post("/add-report", jwtauth, async (req, res) => {
  try {
    const report = new Report(req.body);
    const check= await report.save();
    console.log('line 11',check);
    res.status(200).send({
      message: "Attempt added successfully",
      success: true,
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

router.post("/get-all-reports", jwtauth, async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).send({
      message: "Attempts fetched successfully",
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

router.post("/get-attempts-by-user", jwtauth, async (req, res) => {});

module.exports=router;