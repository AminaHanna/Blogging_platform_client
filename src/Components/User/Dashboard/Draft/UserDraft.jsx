import axios from "axios";
import React, { useEffect, useState } from "react";
import { errorToast, successToast } from "../../../ExternalComponents/toast/toast";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import ReactMarkdown from "react-markdown";
import EmptyBlog from "../NewBlog/EmptyBlog";
import { ContextApi } from "../../../ExternalComponents/ContextAPI/Context";

function UserDraft() {
  const [drafts, setDrafts] = useState([]);
  const {refresh, setRefresh} = React.useContext(ContextApi);

  useEffect(() => {
    fetchDrafts();
  }, [refresh]);

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
      await axios.delete(`http://localhost:3000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")} `,
        },
      });
      setRefresh(!refresh)
      // setDrafts(drafts.filter((draft) => draft._id !== id));
      successToast("Deleted Successfully");
    } catch (error) {
      errorToast(error.message);
    }
  };

  const handlePublish = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/blogs/publish/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setRefresh(!refresh)
      // setDrafts(drafts.filter((draft) => draft._id !== id));
      successToast("Published Successfully");
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <>
      {drafts.length === 0 ? (
        <EmptyBlog />
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {drafts.map((item, index) => {
            return (
              <Card key={index} className="bg-slate-100 w-[400px] m-3">
                <div className="m-5">
                  <div className="flex justify-center">
                    <img src={item?.image} alt="" className="w-[200px] sm:w-[280px] sm:h-[250px]" />
                  </div>
                </div>

                <div className="m-5">
                  <div className="">
                    <div className="text-xs sm:text-base break-words" dangerouslySetInnerHTML={{ __html: item?.name }} />
                    <ReactMarkdown className="break-words">{item?.description}</ReactMarkdown>
                    <p className="text-xs sm:text-base break-words">Categories: {item?.categoriesInfo?.name}</p>
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
                  <button
                    onClick={() => handlePublish(item?._id)}
                    className="border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base"
                  >
                    Publish
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

export default UserDraft;
