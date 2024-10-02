import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { errorToast, successToast } from "../../../ExternalComponents/toast/toast";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

function CreateBlog() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dropdown, setDropdown] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setCategories(response.data.Category);
    } catch (error) {
      errorToast(error.message);
    }
  };

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/blogs",
        { image, name, description, dropdown },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        }
      );

      successToast("Blog Added Successfully");
      navigate("/user/blogs");
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <>
      <div className="py-5">
        <form
          onSubmit={addBlog}
          className="m-auto w-[260px] sm:w-[450px] p-5 rounded-2xl border border-slate-800 shadow-md shadow-slate-800"
        >
          <p className="text-base sm:text-lg mt-3 p-3 text-center">Add Blog</p>

          <p className="font-thin text-slate-800">Set an Image</p>
          <div className="flex justify-center items-center sm:ml-0 ml-2 ">
            <img
              src={image}
              alt="loading..."
              className="bg-slate-100 w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] rounded-lg m-2"
            />
            <FileBase64 onDone={(res) => setImage(res.base64)} />
          </div>

          <div className="flex flex-col w-[200px] gap-3 m-auto mt-3">
            <select
              className="text-slate-800"
              onChange={(e) => setDropdown(e.target.value)}
            >
              <option>Select Category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="outline outline-1 text-xs sm:text-base rounded px-2"
            />

            <div className="mt-3">
              <p className="font-thin text-slate-800">Description</p>
              <MDEditor
                value={description}
                onChange={setDescription}
                className="outline outline-1 text-xs sm:text-base rounded px-2"
              />
            </div>

            <input
              type="submit"
              value="Upload"
              className="text-slate-800 border-slate-800 border text-xs sm:text-base hover:bg-slate-800 hover:text-white mt-3"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;
