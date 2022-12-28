import { Form, Modal } from "antd";
import React from "react";
import { addQuestionToExam, editQuestionById } from "../../../backendConnection/exam";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";

function AddEditQuestion({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion,
}) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const requiredStructure = {
        question: values.question,
        correctOptions: values.correctAnswer,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        examId: examId,
      };
      let response;
      if (selectedQuestion) {
        response=await editQuestionById({...requiredStructure,questionId:selectedQuestion._id})
      } else {
        response = await addQuestionToExam(requiredStructure);
      }
      console.log(response);
      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
      }
      setSelectedQuestion(null);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };
  return (
    <Modal
      title={selectedQuestion ? "Edit Question" : "Add Question"}
      visible={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false);
        setSelectedQuestion(null);
      }}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          question: selectedQuestion?.question,
          correctAnswer: selectedQuestion?.correctOptions,
          A: selectedQuestion?.options.A,
          B: selectedQuestion?.options.B,
          C: selectedQuestion?.options.C,
          D: selectedQuestion?.options.D,
        }}
      >
        <Form.Item label="Question" name="question">
          <input type="text" />
        </Form.Item>
        <Form.Item label="Correct Answer" name="correctAnswer">
          <input type="text" />
        </Form.Item>
        <div className="flex gap-3">
          <Form.Item label="Option A" name="A">
            <input type="text" className="option" />
          </Form.Item>
          <Form.Item label="Option B" name="B">
            <input type="text" className="option" />
          </Form.Item>
        </div>
        <div className="flex gap-3">
          <Form.Item label="Option C" name="C">
            <input type="text" className="option" />
          </Form.Item>
          <Form.Item label="Option D" name="D">
            <input type="text" className="option" />
          </Form.Item>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="canbtn btn-primary"
            type="button"
            onClick={() => setShowAddEditQuestionModal(false)}
          >
            Cancel
          </button>
          <button className="exmbtn btn-primary" type="submit">
            Add
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditQuestion;
