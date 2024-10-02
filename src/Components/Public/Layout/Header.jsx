import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Dropdown from '../../User/Dashboard/UserHeader/Dropdown';

function Header() {
  const [search,SetSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  

    const handleSubmitSearch =async ()=>{
        try {
          const response = await axios.get(
            `http://localhost:3000/api/blogs/search?name=${search}`
          );
          console.log(response.data);
          setSearchResult(response.data.blogs);
          // setData(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }


      const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        setIsSignedIn(false);
      };

      useEffect(()=>{
        if(
          (Boolean(localStorage.getItem('userData')) && Boolean(localStorage.getItem('userToken')))
      ){
          setIsSignedIn(true);
      }else{
        setIsSignedIn(false);
      }
      },[])


  return (
    <>
    <div className="flex justify-between p-5 py-7 bg-slate-900">

        <a href='/#user-header'>
            <div className="text-white">
                <h1 className='sm:text-2xl'>•ᗷℓ𝐎ģǤ𝕀ᑎ𝓰•</h1>
            </div>
        </a>
        <div className="text-white flex gap-5">
          <Link to="/admin">Admin</Link>
          <Link to="/user">User</Link>
        </div>

         {/* ------searchbar start------ */}
         <div className="flex items-center mb-4 sm:mb-0 relative">
          <div className="flex gap-2 rounded">
            <input
              type="text"
              className="md:block hidden w-full px-4 py-2 text-black bg-white border rounded-md focus:border-orange-800 focus:ring-orange-800 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              onChange={(e)=> 
                
                {
                  SetSearch(e.target.value)
                  handleSubmitSearch()
                }
              }
            />
            <button type="button" onClick={handleSubmitSearch} className="hidden md:block px-4 text-slate-900 bg-white hover:bg-slate-800 hover:text-white border-l rounded ">
              Search
            </button>
          </div>

          {/* searching... */}

          
           { search?.length>0 && <div className=" max-h-80 overflow-y-scroll  absolute top-14 bg-white  w-[400px] px-4 py-3">
              { searchResult.map((item)=>{
                return(
                    <>
                  <Link to={`/blogs/${item._id}`} state={item}>
                  <div className="mt-1 mb-1 gap-4 flex justify-start items-center">
                    <div className="">
                      <img src={item.image}
                      alt="" className="w-8 h-8" />
                    </div>
                    <div className="">
                      {item.name}
                    </div>
                  </div>
                  </Link>
                  </>
                )
              })}
              
              
            </div>
            }
          
        </div>
        {/* ------searchbar end------ */}


      <div className="">
          {isSignedIn ? (
            <>
            <div className="flex">
              <div className="">
                {/* dropdown menu */}
                <Dropdown/>
                {/* dropdown menu */}
              </div>
              <button
                className='text-white px-1 text-xl'
                onClick={handleLogout}
              >
                <i class="fa-solid fa-right-from-bracket"></i>
                {/* Logout */}
              </button>
            </div>
            </>
          ) : (
            <Link to="/user-signin">
              <button className='bg-white p-2 mx-2 rounded-lg text-slate-900 hover:text-white hover:bg-slate-800'>
                SignIn
              </button>
            </Link>
          )}
        </div>


    </div>
    </>
  )
}

export default Header
