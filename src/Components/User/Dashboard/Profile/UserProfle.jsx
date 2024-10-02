import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { errorToast } from '../../../ExternalComponents/toast/toast';

function UserProfle() {
    const [ profile, setProfile ] = useState({});
    const [ refresh, setRefresh ] = useState(true);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        navigate('/user-signup');
    }


    useEffect(() => {
        fetchAPI()
    }, [refresh]);

    const fetchAPI = async() => {
        try {
            const response = await axios.get("http://localhost:3000/api/user/profile", {headers: {
                'Authorization' : `Bearer ${localStorage.getItem("userToken")}`
            }});

            setProfile(response.data.user);

        } catch (error) {
            errorToast(error.message);
        }
    }


  return (
    <>
    <div className="flex justify-center my-10">
        <div className="bg-slate-100 rounded-md shadow-xl border border-slate-800 w-[300px] h-[300px] p-5 my-5">
            <Avatar className='m-3' src={profile?.profile}/>
            <p>First Name : {profile.userFname}</p>
            <p>Second Name : {profile.userLname}</p>
            <p>Email : {profile.userEmail}</p>
            <Link to={'accountupdate'}>
                <button className='px-5 py-1 border border-slate-800 rounded-md my-3 hover:bg-slate-800 hover:text-white'>Update</button>
            </Link>
            <p>Come back later ?
                <button onClick={logout} className='font-bold text-slate-500 underline'>Logout</button>
            </p>
        </div>
    </div>
    <div className="flex justify-center mt-5">
      <Outlet />
    </div>
    </>
  )
}

export default UserProfle
