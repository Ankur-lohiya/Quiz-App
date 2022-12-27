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

// export const getExamById = async (id) => {
//   try {
//     console.log(`this id.json() ${id.JSON()}`);
//     const response = await backendConnection.post(`/api/exams/exam-by-id/`,id.JSON());
//     console.log(response.data);
//     return response.data;
//   } catch (err) {
//     console.log("errrrr",err.response.data);
//     return err.response.data;
//   }
// };

export const getExamById = async (id
) => {
  try {
    console.log(`this id.json() ${id}`);
    const response = await backendConnection.post("/api/exams/exam-by-id/",id);
    console.log("response.data");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("errrrr",err.response.data);
    return err.response.data;
  }
}
