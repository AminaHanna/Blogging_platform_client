import { Avatar, Card } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineInsertComment } from "react-icons/md";

function BlogLayout() {
  const { state } = useLocation();

  const item = state;

  return (
    <>
      <div className="">
        <div className="m-auto w-[1000px] my-10">
            <div className="flex">

                <div className="w-fit h-[235px]">
                <img
                    className="h-[400px] w-[400px] rounded-lg"
                    src={item.image}
                    alt="Loading..."
                />
                </div>

                <div className="m-5">
                    <div className="flex gap-5 p-3">
                        <Avatar />
                        <div className="">
                            <p>nameofpublisher</p>
                            <p className="font-light">{item.date}</p>
                        </div>
                    </div>

                    <div className="h-[250px] p-5">
                        <p className="font-bold pb-2 text-xl">{item.name}</p>
                        <p>{item.description}</p>
                    </div>

                    <div className="flex gap-5 p-2">
                        <FaHeart />
                        <CiShare2 />
                        <MdOutlineInsertComment />
                    </div>

                </div>
                
            </div>
          </div>
      </div>
    </>
  );
}

export default BlogLayout;
