import React, { useEffect, useState } from 'react'
import { adminSignup } from '../../ExternalComponents/api/admin';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../ExternalComponents/toast/toast';

function AdminSignUp() {
    const [ formField, setFormField ] = useState({});
    const [ tokenState, setTokenState ] = useState(Boolean(localStorage.getItem("adminToken")));
    const navigate = useNavigate();

    const formdatas = [
        {
            type: "text",
            placeholder: "First Name",
            className:'',
            name: "adminFname"
        },
        {
            type: "text",
            placeholder: "Last Name",
            className:'',
            name: "adminLname"
        },
        {
            type: "email",
            placeholder: "Enter Your Email",
            className:'',
            name: "adminEmail"
        },
        {
            type: "password",
            placeholder: "Enter Your Password",
            className:'',
            name: "adminPassword"
        }
    ]


    useEffect(() => {
        if(tokenState) {
          navigate('/admin')
        }
      }, [navigate, tokenState]);
    

    const onChangeValues = (e) => {
        console.log(e.target.value);
        setFormField({ ...formField, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await adminSignup(formField)
            successToast(response.data.message);
            navigate('/admin-signin')
            
        } catch (error){
            errorToast(error.response.data.message, 'error')
        }
    }



  return (
    <>
     <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} action="" className='w-[400px] h-[480px] border border-slate-800 rounded-3xl shadow-lg shadow-zinc-600 flex flex-col justify-center'>
            
            <h1 className='text-slate-800 text-lg sm:text-2xl m-5'>SIGN UP</h1>
            {
                formdatas.map(({placeholder, type,className, name }, index) => {
                    return(
                        <>
                        <div className="flex justify-center">
                            <input
                            onChange={onChangeValues}
                            key={index}
                            type={type} 
                            name={name} 
                            placeholder={placeholder}
                            className={`${className}  sm:w-[60%] sm:h-[40px] bg-white text-slate-900 flex justify-start ps-5 border border-slate-800 focus:border-slate-800 focus:outline-none focus:ring focus:ring-slate-200 rounded-md items-center m-3`}
                            />
                            </div>
                        </>
                    )
                })
            }

            <input type='submit' className='bg-slate-800 text-xs sm:text-base text-white sm:w-[350px] p-2 m-5 hover:bg-slate-500'/>
        

            <div className="flex gap-2 ml-5">
                <p className='font-semibold text-xs sm:text-base'>Have an account?</p>
                <Link to={'/admin-signin'}>
                    <button className='text-blue-700 text-xs sm:text-base'>Sign in</button>
                </Link>
            </div>
        </form>
    </div>
    </>
  )
}

export default AdminSignUp
