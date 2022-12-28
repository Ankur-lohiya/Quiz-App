import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../backendConnection/exam";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import Instructions from "./instructions";
import { addReport } from "../../backendConnection/report";

function WriteExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [questions = [], setQuestions] = useState([]);
  const [examData, setExamData] = useState(null);
  const [view, setView] = useState("instructions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [result, setResult] = useState();
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const user = useSelector((state) => state.users.users || {});
  const calculateResult = async () => {
    try {
      let totalCorrect = 0;
      let totalWrong = 0;
      questions.forEach((question, index) => {
        if (selectedOption[index] === question.correctOptions) {
          totalCorrect += 1;
        } else if (selectedOption[question._id] === undefined) {
          totalWrong += 1;
        }
      });
      let verdict = "Pass";
      if (totalCorrect < examData.passingMarks) verdict = "Fail";
      const storeResult = {
        totalCorrect,
        totalWrong,
        verdict,
      };
      setResult(storeResult);
      dispatch(showLoading());
      const response = await addReport({
        exam: params.id,
        result: storeResult,
        user: user._id,
      });
      if (response.success) {
        setView("result");
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };
  const getExamData = async () => {
    try {
      dispatch(showLoading());
      const response = await getExamById({ examId: params.id });
      dispatch(hideLoading());
      console.log(examData);
      if (response.success) {
        console.log(response.data);
        setQuestions(response.data.questions);
        setExamData(response.data);
        setTimeLeft(response.data.duration * 60);
        console.log(examData);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };
  const startTimer = () => {
    const time = examData.duration * 60;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      if (timeLeft === 0) {
        clearInterval(intervalId);
        setTimeUp(true);
        calculateResult();
      }
    }, 1000);
    setIntervalId(intervalId);
  };
  useEffect(() => {
    if (timeUp && view!=="result") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);
  return (
    examData && (
      <div>
        <div className="divider"></div>
        <h1 className="text-center">{examData.name}</h1>
        <div className="divider"></div>
        {view === "instructions" && (
          <Instructions
            examData={examData}
            setView={setView}
            view={view}
            startTimer={startTimer}
          />
        )}
        {view === "questions" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-2xl">
                {currentQuestionIndex + 1}:{" "}
                {questions[currentQuestionIndex].question}
              </h1>
              <div className="timer">
                <h1 className="text-2xl">{timeLeft}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {Object.keys(questions[currentQuestionIndex].options).map(
                (option, index) => {
                  return (
                    <div
                      className={`flex gap-2 flex-col ${
                        selectedOption[currentQuestionIndex] === option
                          ? "selected-option"
                          : "option"
                      }`}
                      key={index}
                      onClick={() => {
                        setSelectedOption({
                          ...selectedOption,
                          [currentQuestionIndex]: option,
                        });
                      }}
                    >
                      <h1 className="text-xl">
                        {option}:{" "}
                        {questions[currentQuestionIndex].options[option]}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex justify-between">
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  className="exmbtn"
                  onClick={() => {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <button
                  className="exmbtn"
                  onClick={() => {
                    clearInterval(intervalId);
                    setTimeUp(true);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {view === "result" && (
          <div>
            <h1 className="text-2xl">Result</h1>
            <div className="marks">
              <h1 className="text-md">Total Marks: {examData.totalMarks}</h1>
              <h1 className="text-md">
                Correct Answers: {result.totalCorrect}
              </h1>
              <h1 className="text-md">Wrong Answers: {result.totalWrong}</h1>
              <h1 className="text-md">Verdict: {result.verdict}</h1>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default WriteExam;
