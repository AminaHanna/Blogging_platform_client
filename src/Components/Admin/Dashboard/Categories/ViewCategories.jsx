import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { errorToast, successToast } from '../../../ExternalComponents/toast/toast';

function ViewCategories() {
    const [ category, setCategory ] = useState([]);
    const [ refresh, setRefresh ]  = useState(true);

    useEffect(()=>{
        fetchAPI()
      },[refresh])
    
      const fetchAPI = async(e) =>{
        try {
            const response = await axios.get("http://localhost:3000/api/categories",{headers:{
              'Authorization':`Bearer ${localStorage.getItem("adminToken")} `
            }})
            console.log(response,"res");
      
            setCategory(response.data.Category)
          } catch (error) {
            errorToast(error.message);
          }
    }
    
    
    const handleDelete = async(id) =>{
      try {
        const response = await axios.delete(`http://localhost:3000/api/categories/${id}`,{headers:{
              'Authorization':`Bearer ${localStorage.getItem("adminToken")} `
            }})
        
            setRefresh(!refresh)
        successToast("Deleted Succesfully")
      } catch (error) {
        errorToast(error.message);
      }
    }


  return (
    <>
    <div className="flex flex-wrap justify-center">
      {
        category.map((item)=>{
          return(
          <>
          <div className="flex flex-col justify-between items-center m-5 p-5 w-[150px] sm:w-[200px] h-[100px] sm:h-[150px] border border-slate-800 shadow-md shadow-slate-800 rounded-lg">

            <div className="">
                <p className='text-base sm:text-lg'>{item.name}</p>
            </div>

            <div className=" flex gap-3">
                <Link to={`/admin/categories/edit-category/${item._id}`} state={item}><button  className='border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base rounded'>Edit</button></Link>
                <button onClick={()=>handleDelete(item._id)} className='border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base'>Delete</button>
            </div>
         
          </div>
          </>
          )
        })
      }
    </div>
    </>
  )
}

export default ViewCategories
