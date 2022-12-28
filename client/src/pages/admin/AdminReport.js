import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllReport, getReportByUser } from "../../backendConnection/report";

function AdminReport() {
  const [reportsData, setRerportsData] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
    },
    {
        title: "User Name",
        dataIndex: "userName",
        render:(text,record)=>{
            return `${record.result.totalCorrect+record.result.totalWrong}`
        }
    },
    { title: "Exam Date", dataIndex: "date" },
    { title: "Total Questions", dataIndex: "totalQuestions", render:(text,record)=>{
        return `${record.totalQuestions}`
    } },
    { title: "Verdict", dataIndex: "verdict",render:(text,record)=>{
        return `${record.verdict}`
    } },
  ];
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllReport();
      console.log("reponse 35",response);
      if (response.success) {
        setRerportsData(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading);
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PageTitle title="Reports"></PageTitle>
      <Table columns={columns} dataSource={reportsData} />
    </div>
  );
}

export default AdminReport;
