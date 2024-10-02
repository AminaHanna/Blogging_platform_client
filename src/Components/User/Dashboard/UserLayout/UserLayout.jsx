import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../../Public/Layout/Footer";
import BlogBtn from "../NewBlog/BlogBtn";
import Header from "../../../Public/Layout/Header";

function UserLayout() {
  return (
    <>
      <div className="h-[100vh] w-[100%] m-auto">
        <div className="fixed w-full">
          <Header/>
        </div>

        <div className="pt-24">
          <Outlet />
        </div>

        <div className="fixed right-0 bottom-0 ">
          <BlogBtn/>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default UserLayout;
