import React, { useContext } from "react";
import SideBar from "../components/Sidebar/SideBar";
import Trends from "../components/Trends/Trends";
import { Outlet } from "react-router-dom";
import DataContext from "../context/DataContext";
const RootLayout = () => {
  const { showCommentInput } = useContext(DataContext);
  const styles = {
    margin: "0",
    height: "100%",
    overflow: "hidden",
  };
  return (
    <div className="root-layout" style={showCommentInput ? { styles } : null}>
      <SideBar />
      <Outlet />
      <Trends />
    </div>
  );
};

export default RootLayout;
