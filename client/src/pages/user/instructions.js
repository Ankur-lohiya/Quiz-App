import React from "react";

function Instructions({ examData, setView,view,startTimer}) {
  return (
    <div className="flex flex-col align-center">
      <h1 className="text-2xl">Instructions</h1>
      <ul className="flex flex-col gap-1">
        <li>Exam must completed in {examData.duration} minutes.</li>
        <li>
          Exam will be submitted automatically after {examData.duration}{" "}
          minutes.
        </li>
        <li>Once submitted you cannot change the answers.</li>
        <li>Do not refresh the page</li>
        <li>Total marks of the exam is {examData.totalMarks}</li>
        <li>Passing  marks is {examData.passingMarks}</li>
      </ul>
      <button className="exmbtn" onClick={()=>{
        startTimer();
        setView("questions")
      }}>Start Exam</button>
    </div>
  );
}

export default Instructions;
