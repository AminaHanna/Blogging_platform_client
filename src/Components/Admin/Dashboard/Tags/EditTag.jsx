import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../../../ExternalComponents/toast/toast';

function EditTag() {
    const [name, setName] = useState("");

  const value = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/tags/${id}`,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      console.log(response, "response");
      successToast("Edited Succesfully");
      navigate("/admin/tags");
    } catch (error) {
      errorToast(error.message);
    }
  };

  useEffect(() => {
    setName(value.state.name);
  }, []);

  return (
    <>
    <div className="">
        <form action="" onSubmit={handleEdit}>
          <p className="text-base sm:text-lg mt-3 p-3 text-center">
            Edit Tag
          </p>

          <div className="flex flex-col w-[200px] gap-3 m-auto mt-3">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline outline-1 text-xs sm:text-base rounded px-2"
            />
            <input
              type="submit"
              value="submit"
              className="text-slate-800 border-slate-800 border text-xs sm:text-base hover:bg-slate-800 hover:text-white"
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default EditTag
