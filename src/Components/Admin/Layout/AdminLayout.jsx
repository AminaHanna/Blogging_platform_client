import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import LeftLayout from "./LeftLayout";

function AdminLayout() {
  return (
    <>
      <div className="">
        <div className="flex">
          <div className="">
            <p className="text-lg px-1 sm:px-8 bg-slate-100 sm:text-3xl text-slate-900 p-4">
            •ᗷℓ𝐎ģǤ𝕀ᑎ𝓰•
            </p>
          </div>
          <div className="w-full">
            <Header />
          </div>
        </div>

        <div className="flex">
          <div className="fixed sm:static top-7 left-0 bottom-0 z-50 bg-transparent">
            <LeftLayout />
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
