import "./styles/theme.css";
import "./styles/alignments.css";
import "./styles/textelements.css";
import "./styles/custom-components.css";
import "./styles/form-elements.css";
import Login from "./pages/common/login/";
import Register from "./pages/common/register";
import Home from "./pages/common/homepage/";
import WriteExam from './pages/user/index'; 
import ProtectedRoute from "./components/protectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/layout.css";
import Exams from './pages/admin/Exams/index';
import AddEditExam from "./pages/admin/Exams/AddEditExam";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";

function App() {
  const {loading} =useSelector(state => state.loader)
  return (
    <>
    {loading && <Loader />}
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/exams"
        element={
          <ProtectedRoute>
            <Exams />
          </ProtectedRoute>
        }
      />
      <Route
      path="/user/writeexams/:id"
      element={
        <ProtectedRoute>
          <WriteExam />
        </ProtectedRoute>
      }
    />

      <Route
        path="/admin/exams/add"
        element={
          <ProtectedRoute>
            <AddEditExam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/exams/edit/:id"
        element={
          <ProtectedRoute>
            <AddEditExam />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
    </>
    
  );
}

export default App;
