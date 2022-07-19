import React, { useEffect, useState } from "react";
import { DOMAIN } from "../config/constants";
import Loading from "../components/Loading";
import AuthorCard from "../components/AuthorCard";

const AllAuthors = () => {
  const [authors, setAuthors] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${DOMAIN}/user/`, {
      method: "GET", 
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json())
      .then((data) => {
        setAuthors(data)
        setLoading(false)
    })
  }, [])


  if(loading) return <Loading />
  return (
    <div className=" m-6 md:m-12 text-gray-800 min-h-screen">
    <h1 className="text-2xl font-semibold mb-2">Authors</h1>
    <div className="border-b-2 border-slate-200	mb-2"></div>
      <p> Authors in Blogtor </p>
      <div className="mt-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 ">
        {
          authors.length !== 0 ?
          authors.map(author => {
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
  )
}

export default AllAuthors