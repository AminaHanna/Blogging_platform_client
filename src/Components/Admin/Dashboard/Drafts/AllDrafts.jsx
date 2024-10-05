import axios from "axios";
import React, { useEffect, useState } from "react";
import { errorToast, successToast } from "../../../ExternalComponents/toast/toast";
import { Avatar, Card } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { ContextApi } from "../../../ExternalComponents/ContextAPI/Context";

function AllDrafts() {
  const [drafts, setDrafts] = useState([]);
  // const [refresh, setRefresh] = useState(true);
  const {refresh, setRefresh} = React.useContext(ContextApi);


  useEffect(() => {
    fetchDrafts();
  }, [refresh]);

  const fetchDrafts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blogs/drafts-allusers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      setDrafts(response.data.blogs);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // This will format the date to "dd-MM-yyyy"
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
                <div className="flex gap-5">
                    <Avatar src={item?.userInfo?.profile} />
                    <div className="">
                      <p>{item?.userInfo?.userFname} {item?.userInfo?.userLname}</p>
                      <p>{formatDate(item?.date)}</p>
                    </div>
                  </div>
                  <div className="text-xs sm:text-base break-words" dangerouslySetInnerHTML={{ __html: item?.name }} />
                  <ReactMarkdown className="text-xs sm:text-base break-words">
                    {item?.description}
                  </ReactMarkdown>
                  <p className="text-xs sm:text-base break-words">
                    Categories: {item?.categoriesInfo?.name}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-3">
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

export default AllDrafts;