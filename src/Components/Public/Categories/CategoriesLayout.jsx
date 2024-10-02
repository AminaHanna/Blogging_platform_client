import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { errorToast } from "../../ExternalComponents/toast/toast";
// import { ContextAPI } from "../Context/Context";

function CategoriesLayout() {
  const { page } = useParams();
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async (e) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/blogs/getblog-bycat/${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")} `,
          },
        }
      );
      console.log(response, "res");

      setBlogs(response.data.blogs);
    } catch (error) {
      errorToast(error.message);
    }
    console.log(blogs, "blogs");
  };


  return (
    <>
      {/* {page} */}
      <div className="flex flex-wrap justify-center my-5">
      {blogs.map((item) => {
        return (
          <>
            <Card className="border w-[130px] sm:w-[250px] sm:h-[350px] m-5">
              <Link to={`/blogs/${item._id}`} state={item} >
                <div className="h-[130px] sm:h-[240px]">
                  <img className="h-full w-full" src={item.image} alt="Loading..." />
                </div>
                <div className="p-2 sm:h-[110px] flex justify-center items-center">
                  <p className="text-xs sm:text-xl font-bold">{item.name}</p>
                </div>
              </Link>
            </Card>
          </>
        )
      })}
      </div>
    </>
  );
}

export default CategoriesLayout;