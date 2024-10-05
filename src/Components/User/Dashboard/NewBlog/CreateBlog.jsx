import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { errorToast, successToast } from "../../../ExternalComponents/toast/toast";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Card } from "@mui/material";
import MultipleDropdown from "../../../ExternalComponents/MultipleDropdown/MultipleDropdown";
import ReactMarkdown from "react-markdown";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function CreateBlog() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [date,setDate] = useState('');
  const [description, setDescription] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
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

  const handleBlogSubmit = async (e, isDraft) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/blogs",
        { image, name, description, dropdown, isDraft },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        }
      );

      const successMessage = isDraft ? "Blog Saved to Draft Successfully" : "Blog Added Successfully";
      successToast(successMessage);
      navigate(isDraft ? "/user/drafts" : "/user/published");
    } catch (error) {
      errorToast(error.message);
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className="py-5">
      {!isPreview ? 
      (
        <form
          onSubmit={(e) => handleBlogSubmit(e, false)}
          className="m-auto w-[260px] sm:w-[450px] p-5 rounded-2xl border border-slate-800 shadow-md shadow-slate-800"
        >
          <p className="text-base sm:text-lg mt-3 p-3 text-center">Add Blog</p>

          <p className="font-thin text-slate-800">Set an Image</p>
          <div className="flex justify-center items-center sm:ml-0 ml-2">
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
              required
            >
              <option>Select Category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <MultipleDropdown/>

            {/* <input type='datetime-local' placeholder='date' name='date' value={date}  onChange={(e)=>setDate(e.target.value)} className='outline outline-1 text-xs sm:text-base rounded  px-2' /> */}

            {/* <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="outline outline-1 text-xs sm:text-base rounded px-2"
              required
            /> */}

            <div className="mt-3">
              <p className="font-thin text-slate-800">Post Name</p>
              <ReactQuill 
                value={name}
                onChange={setName}
                className="outline outline-1 text-xs sm:text-base rounded px-2"
                required
              />
            </div>

            <div className="mt-3">
              <p className="font-thin text-slate-800">Description</p>
              <MDEditor
                value={description}
                onChange={setDescription}
                className="outline outline-1 text-xs sm:text-base rounded px-2"
                required
              />
            </div>

            <input
              type="submit"
              value="Upload"
              className="text-slate-800 border-slate-800 border text-xs sm:text-base hover:bg-slate-800 hover:text-white mt-3"
            />
          </div>
        </form>
      ) : 
      
      // blog_preview
      (
        <div className="m-auto w-[260px] sm:w-[450px] p-5 rounded-2xl border border-slate-800 shadow-md shadow-slate-800">
          <p className="text-base sm:text-lg mt-3 p-3 text-center">Preview Blog</p>
          <div className="m-5">
              <Card className='w-[350px] h-[450px]'>
                <div className="flex flex-col">

                  <div className="w-fit h-[235px]">
                      <img className='h-[230px] w-[350px] bg-slate-300' src={image} alt="Loading..." />
                  </div>

                  <div className="h-[110px] px-3">
                    {/* Render the React Quill HTML content */}
                  <div className='py-1 break-words' dangerouslySetInnerHTML={{ __html: name }} />
                    {/* <p className='py-1 break-words'>{name}</p> */}
                    <p>{categories.find(cat => cat._id === dropdown)?.name}</p>
                    <ReactMarkdown className="break-words">
                      {description}
                    </ReactMarkdown>
                  </div>

                </div>
              </Card>
            </div>
        
          <button
            onClick={(e) => handleBlogSubmit(e, false)}
            className="text-slate-800 border-slate-800 border text-xs sm:text-base hover:bg-slate-800 hover:text-white mt-3 px-5 mx-5"
          >
            Publish
          </button>
        </div>
      )}

      <button
        onClick={togglePreview}
        className="text-slate-800 border-slate-800 border text-xs sm:text-base hover:bg-slate-800 hover:text-white mt-3 px-5 mx-10"
      >
        {isPreview ? "Back to Edit" : "Preview"}
      </button>
      {!isPreview && (
        <button
          onClick={(e) => handleBlogSubmit(e, true)}
          className="text-slate-800 border-slate-800 border text-xs sm:text-base hover:bg-slate-800 hover:text-white mt-3 px-5"
        >
          Save as Draft
        </button>
      )}
    </div>
  );
}

export default CreateBlog;
