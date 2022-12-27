import React, { useEffect, useState } from "react";
import { getUserInfo } from "../backendConnection/user";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/usersSlice";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/loaderSlice";

const ProtectedRoutes = ({ children }) => {
  const user = useSelector((state) => state.users.users || {});
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      onClick: () => navigate("/"),
    },
    {
      title: "Reports",
      paths: ["/reports"],
      onClick: () => navigate("/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  const adminMenu = [
    {
      title: "Home",
      paths: ["/"],
      onClick: () => navigate("/"),
    },
    {
      title: "Exams",
      paths: ["/admin/exams", "/admin/exams/add","/admin/exams/edit/"],
      onClick: () => navigate("/admin/exams"),
    },
    {
      title: "Reports",
      paths: ["/admin/reports"],
      onClick: () => navigate("/admin/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await getUserInfo();
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        dispatch(setUsers(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
        // console.log(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const activeRoute = window.location.pathname;
  const getIsActive = (paths) => {
    if (paths.includes(activeRoute)) {return true;}
    else{ 
      if (activeRoute.includes("/admin/exams/edit/") && paths.includes("/admin/exams")){ 
      return true;}
    }
    return false;
  };
  return (
    <div className="layout">
      <div className="flex gap-2">
        <div className="sidebar">
          <div className="menu">
            {menu.map((item, index) => {
              return (
                <div
                  className={`menu-item text-white ${
                    getIsActive(item.paths) && "active-menu-item"
                  }`}
                  key={index}
                  onClick={item.onClick}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div className="header flex justify-between">
            <h1 className="text-2xl text-white">QUIZ APP</h1>
            <h1 className="text-xl text-white">{user.name}</h1>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes;
