import { Col, Form, message, Row, Select, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { addExam, getExamById } from "../../../backendConnection/exam";
import PageTitle from "../../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";

function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = useState({});
  const params = useParams();
  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const response = await addExam(values);
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

  const getExamData = async () => {
    try {
      dispatch(showLoading());
      console.log("console1");
      const response = await getExamById({examId:params.id});
      console.log("console2");
      dispatch(hideLoading());
      if (response.success) {
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
      // get exam data
      console.log(params.id);
      getExamData();
    }
  }, []);
  return (
    <div>
      <PageTitle title={params.id ? "Edit Exam" : "Add Exam"}></PageTitle>
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
                  <Select>
                    <Select.Option value="javascript">Javascript</Select.Option>
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
          </Tabs.TabPane>
          <Tabs.TabPane tab="Questions" key="2"></Tabs.TabPane>
        </Tabs>

        <div className="flex justify-end">
          <button className="exmbtn btn-primary">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default AddEditExam;
