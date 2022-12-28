import React from "react";
import PageTitle from "../../../components/PageTitle";
import { Col, message, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import { getAllExams } from "../../../backendConnection/exam";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate=useNavigate();
  const [exams, setExams] = React.useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.users || {});
  const getExams = async () => {
    try {
      console.log(user);
      dispatch(showLoading());
      const response = await getAllExams();
      // console.log(response);
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

  React.useEffect(() => {
    getExams();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle
          title={`Hey ${user.name} welcome to the Quiz App`}
        ></PageTitle></div>
        <Row gutter={[16, 16]}>
          {exams.map((exam) => (
            <Col span={6}>
              <div className="flex flex-col exmcard">
                <h1 className="text-2xl"><b>{exam.name}</b></h1>
                <div style={{marginTop:"0.2px"}}>
                <h1 className="text-md">Category: {exam.category}</h1>
                <h1 className="text-md">Total Marks: {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks: {exam.passingMarks}</h1>
                <h1 className="text-md">Duration: {exam.duration}</h1></div>
                <button className="exmbtn" onClick={()=>navigate(`/user/writeexams/${exam._id}`)}>Start Quiz</button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
  );
}

export default Home;
