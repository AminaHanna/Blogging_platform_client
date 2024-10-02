import { Avatar } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast } from '../../../ExternalComponents/toast/toast';
import { Link } from 'react-router-dom';

function UserManagement() {
    const [users,setUsers] = useState([]);

    useEffect(()=>{
      fetchUsers()
    },[])
  
    const fetchUsers=async()=>{
      try {
        const response = await axios.get("http://localhost:3000/api/user", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")} `,
            },
          })
         console.log(response,"responseee");    
        setUsers(response.data.users)      
      } catch (error) {
        errorToast(error.message || 'error')
      }
    }

  return (
    <>
    <div className="">
        <div className="flex flex-wrap justify-center gap-5 m-5">
            {
                users.map((item)=>{
                    return(
                        <>
                        <div className="p-5 border border-slate-800 rounded-xl shadow-md w-[150px] sm:w-[200px]">
                            <Avatar src={item.profile}/>
                            <p className='text-xs my-2 text-slate-600'>{item._id}</p>
                            <p className='text-xs sm:text-base font-semibold'>{item.userFname} {item.userLname}</p>
                            <p className='text-xs sm:text-base font-semibold'>{item.userEmail}</p>
                            <p className='text-xs text-slate-600'>created At : </p>
                            <p className='text-xs text-slate-600'>{item.createdAt}</p>
                            <Link to={`/admin/userblogs/${item._id}`}>
                               <button className="border border-slate-800 px-3 my-2 mx-7 hover:bg-slate-800 hover:text-white text-xs sm:text-base">Check</button>
                            </Link>
                        </div>
                        </>
                    )
                })
            }
        </div>
    </div>
    </>
  )
}

export default UserManagement