import { Avatar, Card } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";


function BlogLayout() {
  const { state } = useLocation();

  const item = state;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // This will format the date to "dd-MM-yyyy"
  };

  return (
    <>
      <div className="">
        <div className="m-auto sm:w-[1000px] my-10">
            <div className="flex flex-wrap">

                <div className="w-[400px]">
                <img
                    className="h-[400px] sm:w-[400px] rounded-lg"
                    src={item.image}
                    alt="Loading..."
                />
                </div>

                <div className="m-5">
                    <div className="flex gap-5 p-3">
                        <Avatar />
                        <div className="">
                            <p>{item?.userInfo?.userFname} {item?.userInfo?.userLname}</p>
                            <p className="font-light">{formatDate(item.date)}</p>
                        </div>
                    </div>

                    <div className="h-[250px] w-[300px] sm:w-[500px] p-5 break-words">
                    <div className="text-xs sm:text-base break-words" dangerouslySetInnerHTML={{ __html: item?.name }} />
                        <ReactMarkdown className="break-words">
                          {item?.description}
                        </ReactMarkdown>
                    </div>

                </div>
                
            </div>
          </div>
      </div>
    </>
  );
}

export default BlogLayout;
