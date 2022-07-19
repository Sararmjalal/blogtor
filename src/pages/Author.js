import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DOMAIN } from "../config/constants";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import BlogCard from "../components/BlogCard-all";

const Author = () => {
  const [author, setAuthor] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const navigate = useNavigate()

  function getDate(myDate) {

    let newDate = new Date(myDate)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year} | ${month < 10 ? `0${month}` : `${month}`} | ${date}`
    
  }

  useEffect(() => {
    fetch(`${DOMAIN}/user/singleUser/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json())
    .then((data) => setAuthor(data))
    .then(() => 
      fetch(`${DOMAIN}/blog/by-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: params.id
        })
      }).then((res) => res.json())
      .then((data) => setBlogs(data))
    ).then(() => setLoading(false))
  }, [])


  if(loading) return <Loading />  
  return (
    <>
      <div className={`hidden lg:block lg:absolute left-0 bg-gray-800 xl:w-1/5 lg:w-1/4 h-5/6 rounded-br-3xl z-0 justify-center pt-12 px-8`}>
      <div onClick={() => navigate(-1)} className="text-gray-300 hover:text-white w-max cursor-pointer mb-4">Go Back</div>
        <div>
          <div className="">
          <img className="rounded-full aspect-square object-cover" src={`${DOMAIN}/${author?.avatar}`} onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqGG1REKqgE2MNG8gLCJh5BEujRypjNSJsg&usqp=CAU"}></img>
          </div>
          <h1 className="text-white text-2xl mb-4">{author.username}</h1>
          <div className="mb-0.5">
              <ReactStars
              count={5}
              value={author.averageScore}
              size={20}
              edit={false}
              activeColor="#ffc200"
              />
            </div>
          <div className="text-white mb-2"><span>Name: </span><span className="text-gray-300">{author.name}</span></div>
          <div className="text-white mb-2"><span>Bio: </span><span className="text-gray-300">{author.bio ? author.bio : "Nothing yet!"}</span></div>
          <div className="text-white mb-2"><span>Joined in: </span><span className="text-gray-300">{getDate(author.createdAt)}</span></div>
        </div>
      </div>
    <div className=" m-6 md:my-12 md:mr-12 xl:ml-[23%] lg:ml-[29%] text-gray-800 min-h-screen">
      <h1 className="text-2xl font-semibold mb-2">Author</h1>
      <div className="border-b-2 border-slate-200	mb-2"></div>
      <div className="lg:hidden bg-gray-800 p-8 rounded-2xl my-8">
      <div onClick={() => navigate(-1)} className="text-gray-300 hover:text-white w-max cursor-pointer mb-4">Go Back</div>
        <div className="block sm:flex">
          <div className="sm:w-1/3 w-full flex flex-col justify-center">
            <img className="aspect-square	rounded-full" src={`${DOMAIN}/${author?.avatar}`} onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqGG1REKqgE2MNG8gLCJh5BEujRypjNSJsg&usqp=CAU"}></img>
          </div>
        <div className="sm:w-2/3 w-full sm:pl-8 flex flex-col justify-center">
          <h1 className="text-white text-2xl mb-4 mt-2">{author.username}</h1>
          <div className="mb-0.5">
              <ReactStars
              count={5}
              value={author.averageScore}
              size={20}
              edit={false}
              activeColor="#ffc200"
              />
            </div>
          <h3 className="text-white mb-2"><span>Name: </span><span className="text-gray-300">{author.name}</span></h3>
          <div className="text-white mb-2"><span>Bio: </span><span className="text-gray-300">{author.bio ? author.bio : "Nothing yet!"}</span></div>
          <div className="text-white mb-2"><span>Joined in: </span><span className="text-gray-300">{getDate(author.createdAt)}</span></div>
        </div>
      </div>
      </div>
      <p className="md:text-xl sm:text-lg">Blogs written by <span className="font-semibold text-blue-700">{author.name}</span>:</p>
      <div className="lg:hidden border-b-2 border-slate-200	my-2"></div>
      {
        blogs.length !== 0 ? 
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 mt-4">
            {
              blogs.map(blog => {
                return (
                  <BlogCard
                  blog={blog}
                  />
                )
              })
            }
          </div>
          :
          <p className="font-semibold mt-4">No blogs written by this user yet.</p>
      }
    </div>
    </>
  )
}

export default Author