import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { errorToast } from '../../../ExternalComponents/toast/toast';

function UserBlogsManagement() {
    const [ blogs, setBlogs ] = useState([]);
    const [ refresh, setRefresh ] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        fetchAPI();
      }, [refresh]);
    
      const fetchAPI = async (e) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/blogs/user/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")} `,
              },
            }
          );
          console.log(response, "res");
    
          setBlogs(response.data.data);
        } catch (error) {
          errorToast(error.message);
        }
      };


  return (
    <>
    <div className="flex flex-wrap justify-center">
        {blogs.map((item) => {
          return (
            <>
              <div className="flex flex-col justify-between items-center m-5 p-5 w-[150px] sm:w-[250px] border border-pink-900 shadow-md shadow-pink-900 rounded-lg">
                <div className="">
                  <p className="text-base sm:text-lg text-pink-900 text-center">
                    {item?.name}
                  </p>
                  <p className="text-xs sm:text-base">
                    {item?.description}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  )
}

export default UserBlogsManagement
