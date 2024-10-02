import axios from 'axios';
import React, { useState } from 'react'
import { errorToast } from '../../../ExternalComponents/toast/toast';
import { Avatar } from '@mui/material';
import FileBase64 from "react-file-base64";

function UserProfileUpdate() {
    const [editData,setEditData] =useState({profile:'',userFname:'',userLname:'',userEmail:''});
    const [refresh,setRefresh] = useState(true);

    const onChangeValues = (e) => {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) =>{
      e.preventDefault();
      try {
        const response = await axios.put("http://localhost:3000/api/user/profile",editData,{headers:{
          'Authorization':`Bearer ${localStorage.getItem("userToken")} `
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

                <input  value={editData.userFname}  type="text" placeholder='first name' name='userFname' onChange={onChangeValues} className='outline outline-1 text-xs sm:text-base rounded px-2' />
                <input  value={editData.userLname} type="text" placeholder='second name' name='userLname' onChange={onChangeValues} className='outline outline-1 text-xs sm:text-base rounded px-2' />
                <input  value={editData.userEmail} type="email" placeholder='email' name='userEmail' onChange={onChangeValues} className='outline outline-1 text-xs sm:text-base rounded px-2' />
                <input type="submit" className='text-slate-900 border-slate-900 border text-xs sm:text-base hover:bg-slate-900 hover:text-white'/>
                {JSON.stringify(editData)}
            </div>
        </form>
    </div>
    </>
  )
}

export default UserProfileUpdate
