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
export const getAllReport = async (report) => {
  try {
    const response = await backendConnection.post(
      "/api/report/get-add-reports",
      report
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

//get report by user
export const getReportByUser = async (report) => {
  try {
    const response = await backendConnection.post(
      "/api/report/get-attempts-by-user",
      report
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
