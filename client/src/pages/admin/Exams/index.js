import React from "react";
import "remixicon/fonts/remixicon.css";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import { getAllExams, deleteExamById } from "../../../backendConnection/exam";
function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = React.useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Exam Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
          ></i>
          <i className="ri-delete-bin-line" onClick={() => deleteExam(record._id)}></i>
        </div>
      ),
    },
  ];
  const getExamsData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllExams();
      console.log(response);
      dispatch(hideLoading());
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  const deleteExam = async(id)=>{
    try {
      dispatch(showLoading());
      const response = await deleteExamById({examId:id});
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  } 

  React.useEffect(() => {
    getExamsData();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Exams"></PageTitle>
        <button
          className="flex0 mt-2 exmbtn"
          onClick={() => navigate("/admin/exams/add")}
        >
          Add Exam
        </button>
      </div>
      <Table columns={columns} dataSource={exams} />
    </div>
  );
}

export default Exams;
