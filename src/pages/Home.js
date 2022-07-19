import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { DOMAIN } from "../config/constants";
import BlogCard from "../components/BlogCard-all";
import AuthorCard from "../components/AuthorCard";

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [topBlogs, setTopBlogs] = useState(null)
  const [topAuthors, setTopAuthors] = useState(null)

  useEffect(() => {
    fetch(`${DOMAIN}/blog/top-blogs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json())
    .then((data) => setTopBlogs(data))
    .then(() => 
      fetch(`${DOMAIN}/user/top-users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
      .then((data) => setTopAuthors(data))
    ).then(() => setLoading(false))
  }, [])

  if (loading) return <Loading />
  return (
    <div className=" m-6 md:m-12 text-gray-800 min-h-screen">
    <h1 className="text-2xl font-semibold mb-2">Top Blogs</h1>
    <div className="border-b-2 border-slate-200	mb-2"></div>
      <p> Top blogs rated by you in Blogtor </p>
      <div className="xl:mx-48 lg:mx-24 grid md:grid-cols-3  grid-cols-1 mt-4">
        {
          topBlogs ?
          topBlogs.map(blog => {
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
        <div className="mt-8 lg:mb-10 xl:mb-24">
        <h1 className="text-2xl font-semibold mb-2">Top Authors</h1>
        <div className="border-b-2 border-slate-200	mb-2"></div>
        <p> Top authors rated by you in Blogtor </p>
       <div className="xl:mx-48 lg:mx-24 grid lg:grid-cols-3  md:grid-cols-1 mt-4">
        {
          topAuthors ?
          topAuthors.map(author => {
            return (
              <AuthorCard
              author={author}
              />
            )
          })
            
          :
            <p className="font-semibold">No authors signed up yet.</p>
          
        }

      </div>
        </div>
  </div>
  )
}

export default Home