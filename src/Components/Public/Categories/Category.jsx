import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { errorToast } from '../../ExternalComponents/toast/toast';

function Category() {
  const [showCategories, setShowCategories] = useState(false);
  const [ categories,setCategories ] = useState([]);
  
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  
  useEffect(()=>{
    fetchAPI()
  },[])


  const fetchAPI = async(e) =>{
    try {
        const response = await axios.get("http://localhost:3000/api/categories",{headers:{
          'Authorization':`Bearer ${localStorage.getItem("adminToken")} `
        }})
        console.log(response,"res");
  
        setCategories(response.data.Category)
      } catch (error) {
        errorToast(error.message)
      }
}

  return (
    <>
     {/* header-start */}
     <div className="flex border border-slate-800 flex-col sm:flex-row justify-between gap-3 p-4 text-slate-800">


        <div className="hidden sm:flex flex-wrap justify-center gap-5 m-auto w-[full]">

        { categories && categories.map((item)=>{
                return(
                <> 
                <Link to={`/categoriesname/${item._id}` } className='hover:bg-slate-100 border p-2 rounded-lg'>
                    <p>{item.name}</p>
                </Link>
                </>
                )
              })
            }
        </div>



       {/* Toggle button */}
       <button onClick={toggleCategories} className='border p-2 rounded-lg sm:hidden text-sm'>
          {showCategories ? <p className='text-xl'><i class="fa-solid fa-circle-xmark"></i></p> : 'Show Categories'}
        </button>
{/* to smaller scrn */}
        { showCategories && categories.map((item)=>{
                return(
                <> 
                <Link to={`/categoriesname/${item._id}` } className='hover:bg-slate-100 p-2 rounded-lg'>
                    <p>{item.name}</p>
                </Link>
                </>
                )
              })
            }

        </div>
        {/* header-end */}

    </>
  )
}

export default Category;