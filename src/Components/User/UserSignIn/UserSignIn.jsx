import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../ExternalComponents/toast/toast';
import { userSignin } from '../../ExternalComponents/api/user';

function UserSignIn() {
    const [ formField, setFormField ] = useState({});
    const [ tokenState, setTokenState ] = useState(Boolean(localStorage.getItem("userToken")));
    const navigate = useNavigate();

    const formdatas = [
        {
            type: "email",
            placeholder: "Enter Your Email",
            className:'',
            name: "userEmail"
        },
        {
            type: "password",
            placeholder: "Enter Your Password",
            className:'',
            name: "userPassword"
        }
    ]

    useEffect(() => {
        if(tokenState) {
            navigate('/user')
        }
    }, [navigate, tokenState]);


    const onChangeValues = (e) => {
        console.log(e.target.value);
        setFormField({ ...formField, [e.target.name]: e.target.value });
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formField);

        try {
            const response = await userSignin(formField);

            successToast(response.data.message);
            console.log("token...", response.data.token);

            if (!response.data.token) {
                return errorToast("Token is not Provided")
            }

            localStorage.setItem("userToken",response.data.token);
            localStorage.setItem("userData",JSON.stringify(response.data.users))

            navigate('/user')
        } catch (error) {
            errorToast(error.response.data.message, "error")
        }
    }



  return (
    <>
    <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} action="" className='w-[400px] h-[400px] border border-slate-800 rounded-lg shadow-lg shadow-zinc-600 flex flex-col justify-center'>
            
            <h1 className='text-slate-800 text-lg sm:text-2xl m-5'>SIGN IN</h1>
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
                            className={`${className}  sm:w-[70%] sm:h-[40px] bg-white text-slate-900 flex justify-start ps-5 border border-slate-800 focus:border-slate-800 focus:outline-none focus:ring focus:ring-slate-200 rounded-md items-center m-3`}
                            />
                            </div>
                        </>
                    )
                })
            }

            <input type='submit' className='bg-slate-800 text-white text-xs sm:text-base  p-2 m-5 hover:bg-slate-500'/>

            <button className='text-slate-800 text-xs sm:text-base'><Link to={'/user-signup'}>SignUp</Link></button>

        </form>
    </div>
    </>
  )
}

export default UserSignIn;
