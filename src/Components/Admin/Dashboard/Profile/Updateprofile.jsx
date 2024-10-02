import axios from 'axios';
import React, { useState } from 'react'
import { errorToast } from '../../../ExternalComponents/toast/toast';
import { Avatar } from '@mui/material';
import FileBase64 from "react-file-base64";

function Updateprofile() {
    const [editData,setEditData] =useState({profile:'',adminFname:'',adminLname:'',adminEmail:''});
    const [refresh,setRefresh] = useState(true);

    const onChangeValues = (e) => {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) =>{
      e.preventDefault();
      try {
        const response = await axios.put("http://localhost:3000/api/admin/profile",editData,{headers:{
          'Authorization':`Bearer ${localStorage.getItem("adminToken")} `
        }})
        console.log(response, 'response');
        setRefresh(!refresh);
      } catch (error) {
        errorToast(error.message);
      }
    }

    
  return (
    <>
    <div className="">
    <form action="" onSubmit={handleSubmit}>
            <p className='text-base sm:text-lg mt-3 p-3 text-center'>Update your profile</p>
      
            <div className="flex flex-col w-[200px] gap-3 m-auto mt-3">
            <Avatar src={editData.profile} className=''/>    
                
            <FileBase64 onDone={ (res)=>setEditData({...editData,profile:res.base64}) } />

                <input  value={editData.adminFname}  type="text" placeholder='first name' name='adminFname' onChange={onChangeValues} className='outline outline-1 text-xs sm:text-base rounded px-2' />
                <input  value={editData.adminLname} type="text" placeholder='second name' name='adminLname' onChange={onChangeValues} className='outline outline-1 text-xs sm:text-base rounded px-2' />
                <input  value={editData.adminEmail} type="email" placeholder='email' name='adminEmail' onChange={onChangeValues} className='outline outline-1 text-xs sm:text-base rounded px-2' />
{JSON.stringify(editData)}
                <input type="submit" className='text-slate-900 border-slate-900 border text-xs sm:text-base hover:bg-slate-900 hover:text-white'/>
            </div>
        </form>
    </div>
    </>
  )
}

export default Updateprofile
