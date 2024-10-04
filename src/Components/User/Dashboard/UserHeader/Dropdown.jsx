import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast } from '../../../ExternalComponents/toast/toast';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/user-signup");
  };


  useEffect(()=>{
    fetchAPI()
  },[])

  const fetchAPI = async() =>{
    try {
      const response = await axios.get("http://localhost:3000/api/user/profile",{headers:{
        'Authorization':`Bearer ${localStorage.getItem("userToken")} `
      }})

      setUser(response.data.user)

    } catch (error) {
      errorToast(error.message);
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-white px-4 rounded focus:outline-none"
      >
            <div className="flex items-center">
              <p className='text-white text-xs sm:text-base'>{ user.userFname } { user.userLname }</p>
              <Avatar src={ user.profile } className='mx-2'/><i class="fa-solid fa-angle-down"></i>
            </div>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 sm:w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link to={'account'}
              className="block px-4 py-2 text-sm text-slate-800 hover:bg-gray-100"
            >
              <p className='flex gap-1 sm:gap-2'>
                <span><i class="fa-solid fa-user"></i></span>
                <span>My Account</span>
              </p>
            </Link>

            <Link to={''}
              className="block px-4 py-2 text-sm text-slate-800 hover:bg-gray-100"
            >
              <p className='flex gap-1 sm:gap-2'>
                <span><i class="fa-solid fa-house"></i></span>
                <span> Home</span>
              </p>
            </Link>

            <Link to={'blogs'}
              className="block px-4 py-2 text-sm text-slate-800 hover:bg-gray-100"
            >
              <p className='flex gap-1 sm:gap-2'>
                <span><i class="fa-solid fa-bag-shopping"></i></span>
                <span> My Blogs</span>
              </p>
            </Link>

            <Link to={'drafts'}
              className="block px-4 py-2 text-sm text-slate-800 hover:bg-gray-100"
            >
              <p className='flex gap-1 sm:gap-2'>
                <span><i class="fa-solid fa-cart-shopping"></i></span>
                <span> Drafts</span>
              </p>
            </Link>

            <Link to={'published'}
              className="block px-4 py-2 text-sm text-slate-800 hover:bg-gray-100"
            >
              <p className='flex gap-1 sm:gap-2'>
                <span><i class="fa-solid fa-cart-shopping"></i></span>
                <span> Published</span>
              </p>
            </Link>

            <Link to={'like'}
              className="block px-4 py-2 text-sm text-slate-800 hover:bg-gray-100"
            >
              <p className='flex gap-1 sm:gap-2'>
                <span><i class="fa-solid fa-heart"></i></span>
                <span> Likes </span>
              </p>
            </Link>

            <Link to={'cmt'}
              className="block px-4 py-2 text-sm text-slate-800 hover:bg-gray-100"
            >
              <p className='flex gap-1 sm:gap-2'>
                <span><i class="fa-solid fa-comment"></i></span>
                <span> Comments </span>
              </p>
            </Link>

            <Link onClick={logout}
              className="block px-4 py-2 text-sm text-white bg-slate-800 hover:bg-gray-100 hover:text-slate-800"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;