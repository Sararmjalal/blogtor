import React, { useEffect, useState } from "react";
import { DOMAIN } from "../config/constants";
import Cookies from 'universal-cookie';
import BlogImage from "../uploads/BlogImage.jpg"
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
const cookies = new Cookies();

const BlogList = () => {
  const token = cookies.get('ut')
  const [blogs, setBlogs] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchMyBlogs = () => {
    fetch(`${DOMAIN}/blog/my-blogs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth": `ut ${token}`
      },
    }).then((res) => res.json())
      .then((data) => {
      setBlogs(data)
      })
    .then(setLoading(false))
  }

  useEffect(() => {
    fetchMyBlogs()
  }, [])

  const remove = (blogId) => {
    fetch(`${DOMAIN}/blog/delete`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "auth": `ut ${token}`
      },
      body: JSON.stringify({blogId})
    }).then((res) => res.json())
      .then(({msg}) => {
        if (msg === "ok")
        fetchMyBlogs()
      }).then(toast.info("Your blog has been removed."))
    
    
    setConfirmDelete(false)
  }

  if(loading) return <Loading />
  return (
    <div className="lg:w-[calc(100vw-24rem)] m-6 md:m-12 text-gray-800">
      <div className="flex mb-4">
        <h1 className="text-2xl font-semibold mb-2 lg:w-[calc(100vw-31.8rem)] md:w-[calc(100vw-13.8rem)] w-[calc(100vw-11.3rem)]">Blog List</h1>
        <a href="/dashboard/blogs/create"><button className="text-white bg-gray-800 font-medium rounded-lg text-sm px-6 py-2.5 ">Create Blog</button></a>
      </div>
      <div className="border-b-2 border-slate-200	mb-2"></div>
      <div className="mt-4">
        {
          blogs.length !== 0 ? 
            
          blogs.map(blog => {
            return (
              <div>
              <div className="my-4 flex">
              <div className="w-24">
                <a href={`/dashboard/blogs/edit/${blog._id}`}>
                <img className="aspect-square object-cover cursor-pointer w-24 h-24 rounded-full opacity-70 shadow-md	shadow-blue-700/10" src={blog.imgurl} onError={(e) => e.target.src=BlogImage}></img>
                </a>
                </div>
                <div className="lg:w-[calc(100vw-36rem)] w-[calc(100vw-16rem)]">
                  <a href={`/dashboard/blogs/edit/${blog._id}`}>
                  <p className="text-gray-500 hover:text-gray-800 cursor-pointer ml-8 mt-8 font-semibold md:text-base text-sm">{blog.title.length > 15 ? blog.title.slice(0,15) + "..." : blog.title}</p>
                  </a>
                </div>
                <div className="mt-8 text-right w-28 text-sm">
                  <a href={`/dashboard/blogs/edit/${blog._id}`}><button className="text-gray-500 hover:text-gray-800">Edit</button></a><span> | </span><button onClick={() => setConfirmDelete(true)} className="text-gray-500 hover:text-gray-800">Remove</button>
                </div>
                </div>
                {
                  confirmDelete ?
                    <>
                      <div className="bg-black fixed top-0 left-0 w-screen h-screen opacity-10 z-20" onClick={() => setConfirmDelete(false)}></div>
                      <div className=" bg-white z-20 fixed w-5/6 m-auto left-[calc(50vw-42%)] top-[calc(50vh-17%)] xl:w-1/4 lg:w-1/3 lg:h-1/5  px-6 lg:top-[calc(50vh-16.5%)] lg:left-[calc(50vw-15%)] rounded-2xl shadow-md shadow-blue-700/10 justify-center">
                      <h1 className="text-blue-700 mt-5 font-semibold	text-xl	">Delete Blog</h1>
                      <p>Are you sure you want to delete this blog?</p>
                        <div className="flex mt-4">
                          <button onClick={() => setConfirmDelete(false)} className="w-[calc(50%-4px)] mt-3 mb-12 py-3  text-white bg-blue-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-base px-4 mr-2 ">Cancel</button>
                          <button onClick={() => remove(blog._id)} className="w-[calc(50%-4px)] mt-3 mb-12 py-3 text-gray-400 bg-gray-200 hover:bg-primary-800  hover:bg-primary-800  font-medium rounded-xl text-base px-4 mr-2 ">Yes</button>
                        </div>
                      </div>
                      </>
                    :
                    ""
                }
              </div>

               
                
            )
          })
            :
            <p className="font-semibold">You have no blogs yet. Create your first blog right now!</p>
        }
      </div>
    </div>
  )
}

export default BlogList 