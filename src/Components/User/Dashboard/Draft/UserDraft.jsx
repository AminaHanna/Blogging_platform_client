import axios from "axios";
import React, { useEffect, useState } from "react";
import { errorToast } from "../../../ExternalComponents/toast/toast";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";

function UserDraft() {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blogs/drafts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      setDrafts(response.data.drafts);
    } catch (error) {
      errorToast(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")} `,
          },
        }
      );

      setRefresh(!refresh);
      successToast("Deleted Succesfully");
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <>
    <div className="flex flex-wrap justify-center items-center">
        {drafts.map((item, index) => {
          return (
            <>
              <Card key={index} className="bg-slate-100 w-[400px] m-3">
              <div className="m-5">
                <div className="flex justify-center">
                  <img src={item?.image} alt="" className="w-[200px] sm:w-[280px] sm:h-[250px]" />
                </div>
              </div>

              <div className="m-5">
                <div className="">
                  <p className="text-xs sm:text-base break-words">name: {item?.name}</p>
                  <p className="text-xs sm:text-base break-words">
                    Description: {item?.description}
                  </p>
                  <p className="text-xs sm:text-base break-words">
                    Categories: {item?.categoriesInfo?.name}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Link to={`/user/blogs/edit-blog/${item?._id}`} state={item}>
                  <button className="border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(item?._id)}
                  className="border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base"
                >
                  Delete
                </button>
              </div>
            </Card>
            </>
          );
        })}
    </div>
    </>
  );
}

export default UserDraft;
