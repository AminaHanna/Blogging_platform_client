import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FileBase64 from "react-file-base64"
import { errorToast, successToast } from '../../../ExternalComponents/toast/toast';
import MultipleDropdown from '../../../ExternalComponents/MultipleDropdown/MultipleDropdown';

function EditBlog() {
    const [image,setImage] = useState([]);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [categories,setCategories] = useState([]);
    const [ dropdown,setDropdown ] = useState('');

    const {id} = useParams();
    const navigate = useNavigate();

    const value = useLocation();
    console.log("value: ",value.state);



  const editBlog = async(e) =>{
    e.preventDefault()
    try {
        const response = await axios.put(`http://localhost:3000/api/blogs/${id}`,{image:image,name:name,description:description,dropdown},
        {
          headers:{
          'Authorization':`Bearer ${localStorage.getItem("userToken")}`
          }
        })
  
        // setEdit(response.data.users)
        console.log(response,"response");

        navigate('/user/blogs');
        successToast("Edited Succesfully");
      } catch (error) {
        errorToast(error.message);
      }
}


// edit aakmbo avde already illa details displey cheyyaan vndi aan uselocation use cheythe..
// ith kittaan view page l state  item pass cheythkn...
// OR
// allenki input kodkna avde valuente ullil name maatteett value.state.name kodthaalm mathi
  useEffect(()=>{
    setName(value.state.name)
    setDescription(value.state.description)
    setCategories(value.state.categories)
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
    <div className="">
        <form action="" onSubmit={editBlog} className='m-auto w-[260px] sm:w-[450px] p-5 rounded-2xl border border-slate-800 shadow-md shadow-slate-800'>
            <p className='text-base sm:text-lg mt-3 p-3 text-center'>Edit Blogs</p>
            <div className="justify-center items-center sm:ml-0 ml-2 ">

                <p className='font-thin text-slate-800'>Set an Image</p>
                <div className="flex justify-center items-center sm:ml-0 ml-2 ">
                        <img src={image} alt="loading..." className='bg-slate-100 w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] rounded-lg m-2' />
                <FileBase64 onDone={ (res)=>setImage(res.base64)} />
                </div>

            </div>

            <div className="flex flex-col w-[200px] gap-3 m-auto mt-3">

                <select name="" id="" onChange={(e)=> setDropdown(e.target.value) }>
                <option>Select</option>
                { 
                    categories && categories.map((item)=>{
                    return(
                    <>
                    <option key={item._id} value={item._id}>{item.name}</option>
                    </>
                    )
                })
                }
                </select>

                <MultipleDropdown/>
                <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} className='outline outline-1 text-xs sm:text-base rounded px-2' />
                <input type="text" placeholder='description' value={description} onChange={(e)=>setDescription(e.target.value)} className='outline outline-1 text-xs sm:text-base rounded px-2' />
                <input type="submit" value="submit"  className='text-slate-800 border-slate-800 border text-xs sm:text-base hover:bg-slate-800 hover:text-white'/>
            </div>
        </form>
    </div>
    </>
  )
}

export default EditBlog;
