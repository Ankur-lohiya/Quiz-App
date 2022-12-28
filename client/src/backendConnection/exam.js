const { default: backendConnection } = require(".");

export const addExam = async (exam) => {
  try {
    const response = await backendConnection.post("/api/exams/add", exam);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const getAllExams = async () => {
  try {
    const response = await backendConnection.post("/api/exams/all-exams");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const getExamById = async (id) => {
  try {
    const response = await backendConnection.post("/api/exams/exam-by-id/", id);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const editExamById = async (exam) => {
  try {
    console.log(exam);
    const response = await backendConnection.post(
      "/api/exams/edit-exam-by-id",
      exam
    );
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const deleteExamById = async (id) => {
  try {
    const response = await backendConnection.post(
      "/api/exams/delete-exam-by-id",
      id
    );
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const addQuestionToExam = async (question) => {
  console.log(question);
  try {
    const response = await backendConnection.post(
      "/api/exams/add-question",
      question
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const editQuestionById = async (editQuestion) => {
  try {
    const response = await backendConnection.post(
      "/api/exams/edit-question-in-exam",
      editQuestion
    );
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const deleteQuestionById = async (id) => {
  try {
    const response = await backendConnection.post(
      "/api/exams/delete-question-in-exam",
      id
    );
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
}
