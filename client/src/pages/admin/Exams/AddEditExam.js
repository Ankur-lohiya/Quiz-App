import { Col, Form, message, Row, Select, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import {
  addExam,
  getExamById,
  editExamById,
  deleteQuestionById,
} from "../../../backendConnection/exam";
import PageTitle from "../../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import AddEditQuestion from "./AddEditQuestion";

function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = useState(null);
  const params = useParams();
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response;
      if (params.id) {
        response = await editExamById({ ...values, examId: params.id });
      } else {
        response = await addExam(values);
      }

      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const deleteQuestion =async(questionId)=>{
    try{
      dispatch(showLoading());
      const response = await deleteQuestionById({questionId,examId:params.id});
      if(response.success){
        message.success(response.message);
        getExamData();
      }else{
        message.error(response.message);
      }
      dispatch(hideLoading());
    }catch(err){
      dispatch(hideLoading());
      message.error(err.message);
    }
  }

  const getExamData = async () => {
    try {
      dispatch(showLoading());
      const response = await getExamById({ examId: params.id });
      dispatch(hideLoading());
      console.log(examData);
      if (response.success) {
        console.log(response.data);
        setExamData(response.data);
        console.log(examData);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };
  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  const quesColumns = [
    {
      title: "Question",
      dataIndex: "question",
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div>
              {key}. {record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Correct Answer",
      dataIndex: "correctOptions",
      render: (text, record) => {
        return `${record.correctOptions}. ${
          record.options[record.correctOptions]
        }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i className="ri-pencil-line" onClick={() => {
              setSelectedQuestion(record);
              setShowAddEditQuestionModal(true);
          }}></i>
          <i className="ri-delete-bin-line" onClick={() => deleteQuestion(record._id)}></i>
        </div>
      ),
    },
  ];

  
  return (
    <div>
      <PageTitle title={params.id ? "Edit Exam" : "Add Exam"}></PageTitle>
      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Exam Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Exam Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration(in minutes)" name="duration">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category">
                    <Select placeholder="Select a Category">
                      <Select.Option value="javascript">
                        Javascript
                      </Select.Option>
                      <Select.Option value="react">React</Select.Option>
                      <Select.Option value="node">Node JS</Select.Option>
                      <Select.Option value="mongo">Mongo DB</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <button
                  className="canbtn btn-primary"
                  type="button"
                  onClick={() => navigate("/admin/exams/")}
                >
                  Cancel
                </button>
                <button className="exmbtn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </Tabs.TabPane>
            {params.id && (
              <Tabs.TabPane tab="Questions" key="2">
                <div className="flex justify-between">
                  <h1>Questions</h1>
                  <button
                    className="exmbtn btn-primary"
                    type="button"
                    onClick={() => setShowAddEditQuestionModal(true)}
                  >
                    Add Question
                  </button>
                </div>
                <Table columns={quesColumns} dataSource={examData.questions} />
              </Tabs.TabPane>
            )}
          </Tabs>
        </Form>
      )}

      {showAddEditQuestionModal && (
        <AddEditQuestion
          setShowAddEditQuestionModal={setShowAddEditQuestionModal}
          showAddEditQuestionModal={showAddEditQuestionModal}
          examId={params.id}
          refreshData={getExamData}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
}

export default AddEditExam;
