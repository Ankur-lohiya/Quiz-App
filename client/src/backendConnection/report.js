import { message } from "antd";

const { default: backendConnection } = require(".");

//add report
export const addReport = async (report) => {
  try {
    const response = await backendConnection.post(
      "/api/report/add-report",
      report
    );
    console.log(report);
    return response.data;
  } catch (err) {
    console.log(err.message);
    message.error(err.message);
  }
};

//get all report
export const getAllReport = async () => {
  try {
    console.log("get all report")
    const response = await backendConnection.post(
      "/api/report/get-all-reports"
    );
    console.log(response)
    return response.data;
  } catch (err) {
    console.log(err.message);
    message.error(err.message);
  }
};

//get report by user
export const getReportByUser = async () => {
  try {
    const response = await backendConnection.post(
      "/api/report/get-reports-by-user"
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
    message.error(err.message);
  }
};
