import { Avatar, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineInsertComment } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Blog() {
    const [data,setData] = useState([])

    useEffect(()=>{
      fetchdata()
    },[])


    const fetchdata = async ()=>{
        try {
            const response = await axios.get("http://localhost:3000/api/blogs/get-all-blogs");
            setData(response.data.blogs);
            console.log(response,"kkk");
        } catch (error) {
            
        }
    }


  return (
    <>
    <div className="flex flex-wrap mx-16 justify-center">
      {
        data.map((item,index) => {
          return(
            <>
            <div className="m-5">
              <Card className='w-[350px] h-[450px]'>
                <div className="flex flex-col">

                  <div className="flex gap-5 p-3">
                    <Avatar/>
                    <div className="">
                      <p>username</p>
                      <p className='font-light'>{item.date}</p>
                    </div>
                  </div>

                  <div className="w-fit h-[235px]">
                    <Link to={`/blogs/${item._id}`} state={item} >
                      <img className='h-[230px] w-[350px] bg-slate-300' src={item.image} alt="Loading..." />
                    </Link>
                  </div>

                  <div className="h-[110px] px-3">
                    <p className='py-1 break-words'>{item.name}</p>
                    <p className='break-words'>{item.description}</p>
                  </div>

                  <div className="flex gap-3 p-2">
                    <FaHeart />
                    <CiShare2 />
                    <MdOutlineInsertComment />
                  </div>

                </div>
              </Card>
            </div>
            </>
          )
        })
      }
    </div>
    </>
  )
}

export default Blog