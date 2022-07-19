import React, { useEffect, useState } from "react";
import { DOMAIN } from "../config/constants";
import BlogCard from "../components/BlogCard-all";
import Loading from "../components/Loading";

const AllBlog = () => {
  const [blogs, setBlogs] = useState("")
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch(`${DOMAIN}/blog`, {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .then((data) => {
        setBlogs(data)
        setLoading(false)
      })
  }, [])



  if(loading) return <Loading />
  return (
    <div className=" m-6 md:m-12 text-gray-800 min-h-screen">
    <h1 className="text-2xl font-semibold mb-2">Blogs</h1>
    <div className="border-b-2 border-slate-200	mb-2"></div>
      <p> Take a look on the all blogs we have in here! </p>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
        {
          blogs.length !== 0 ?
            blogs.map(blog => {
            return (
              <BlogCard
                blog={blog}
              />
            )
          })
            :
            <p className="font-semibold">No blogs created yet.</p>
        }
      </div>
  </div>
  )
}

export default AllBlog