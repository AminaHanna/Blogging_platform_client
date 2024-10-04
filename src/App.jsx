import React from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from './Components/Public/Layout/MainLayout'
import HomePage from './Components/Public/HomePages/HomePage'
import AdminLayout from './Components/Admin/Layout/AdminLayout'
import AdminHome from './Components/Admin/Dashboard/Home/AdminHome'
import AdminProfile from './Components/Admin/Dashboard/Profile/AdminProfile'
import AdminSignUp from './Components/Admin/SignUp/AdminSignUp'
import AdminSignIn from './Components/Admin/SignIn/AdminSignIn'
import Updateprofile from './Components/Admin/Dashboard/Profile/Updateprofile'
import ViewCategories from './Components/Admin/Dashboard/Categories/ViewCategories'
import EditCategories from './Components/Admin/Dashboard/Categories/EditCategories'
import AddCategories from './Components/Admin/Dashboard/Categories/AddCategories'
import Categories from './Components/Admin/Dashboard/Categories/Categories'
import BlogView from './Components/Admin/Dashboard/Blogs/BlogView'
import MultipleDropdown from './Components/ExternalComponents/MultipleDropdown/MultipleDropdown'
import Tags from './Components/Admin/Dashboard/Tags/Tags'
import ViewTag from './Components/Admin/Dashboard/Tags/ViewTag'
import EditTag from './Components/Admin/Dashboard/Tags/EditTag'
import AddTag from './Components/Admin/Dashboard/Tags/AddTag'
import AdminAuthorizedRoute from './Components/Admin/AdminAuthorizedRoute'
import UserAuthorizedRoute from './Components/User/UserAuthorizedRoute'
import UserLayout from './Components/User/Dashboard/UserLayout/UserLayout'
import UserSignUp from './Components/User/UserSignUp/UserSignUp'
import UserSignIn from './Components/User/UserSignIn/UserSignIn'
import CategoriesLayout from './Components/Public/Categories/CategoriesLayout'
import BlogLayout from './Components/Public/Blogs/BlogLayout'
import UserProfle from './Components/User/Dashboard/Profile/UserProfle'
import UserProfileUpdate from './Components/User/Dashboard/Profile/UserProfileUpdate'
import UserBlogs from './Components/User/Dashboard/NewBlog/UserBlogs'
import ViewBlog from './Components/User/Dashboard/NewBlog/ViewBlog'
import EditBlog from './Components/User/Dashboard/NewBlog/EditBlog'
import CreateBlog from './Components/User/Dashboard/NewBlog/CreateBlog'
import UserDraft from './Components/User/Dashboard/Draft/UserDraft'
import UserManagement from './Components/Admin/Dashboard/AllUsers/UserManagement'
import UserBlogsManagement from './Components/Admin/Dashboard/AllUsers/UserBlogsManagement'
import Published from './Components/User/Dashboard/Published/Published'
import AllDrafts from './Components/Admin/Dashboard/Drafts/AllDrafts'

function App() {
  const router = createBrowserRouter ([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          path: "",
          element: <HomePage/>
        },
        {
          path: "categoriesname/:page",
          element: <CategoriesLayout/>
        },
        {
          path: "blogs/:bloglayout",
          element: <BlogLayout/>
        }
      ]
    },


    {
      path: "/user",
      element:<UserAuthorizedRoute>
                <UserLayout/>
              </UserAuthorizedRoute>,
      children: [
        {
          path: "",
          element: <HomePage/>
        },
        {
          path: "drafts",
          element: <UserDraft/>
        },
        {
          path: "published",
          element: <Published/>
        },
        {
          path: "categoriesname/:page",
          element: <CategoriesLayout/>
        },
        {
          path: "blogs/:bloglayout",
          element: <BlogLayout/>
        },
        {
          path: "blogs",
          element: <UserBlogs/>,
          children: [
            {
              path: "",
              element: <ViewBlog/>
            },
            {
              path: "edit-blog/:id",
              element: <EditBlog/>
            },
            {
              path: "add-blog",
              element: <CreateBlog/>
            },
            {
              path: "drafts",
              element: <UserDraft/>
            },
            {
              path: "published",
              element: <Published/>
            }
          ]
        },
        {
          path: "account",
          element: <UserProfle/>,
          children: [
            {
              path: "accountupdate",
              element: <UserProfileUpdate/>
            }
          ]
        },
      ]
    },


    {
      path: "/admin",
      element: 
      <AdminAuthorizedRoute>
        <AdminLayout/>
      </AdminAuthorizedRoute>,
      children: [
        {
          path: "",
          element: <AdminHome/>,
        },
        {
          path: "profile",
          element: <AdminProfile/>,
          children: [
            {
              path: "update",
              element: <Updateprofile/>
            }
          ]
        },
        {
          path: "categories",
          element: <Categories/>,
          children: [
            {
              path: "",
              element: <ViewCategories/>
            },
            {
              path: "edit-category/:id",
              element: <EditCategories/>
            },
            {
              path: "add-category",
              element: <AddCategories/>
            }
          ]
        },
        {
          path: "blogs",
          element: <BlogView/>,
        },
        {
          path: "tags",
          element: <Tags/>,
          children: [
            {
              path: "",
              element: <ViewTag/>
            },
            {
              path: "edit-tag/:id",
              element: <EditTag/>
            },
            {
              path: "add-tag",
              element: <AddTag/>
            }
          ]
        },
        {
          path: "all-drafts",
          element: <AllDrafts/>
        },
        {
          path: "all-users",
          element: <UserManagement/>
        },
        {
          path: "userblogs/:id",
          element: <UserBlogsManagement/>
        }
      ]
    },



    {
      path: "/user-signup",
      element: <UserSignUp/>
    },
    {
      path: "/user-signin",
      element: <UserSignIn/>
    },


    {
      path: "/admin-signup",
      element: <AdminSignUp/>
    },
    {
      path: "/admin-signin",
      element: <AdminSignIn/>
    },
    {
      path: "multi-dropdown",
      element: <MultipleDropdown/>
    }
  ])

  return (
    <>
      <RouterProvider router = {router} />
    </>
  )
}

export default App
