import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DOMAIN } from "../config/constants";
import BlogImage from "../uploads/BlogImage.jpg"
import ReactStars from "react-rating-stars-component";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import Loading from "../components/Loading";

const cookies = new Cookies();

const Blog = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)
  const params = useParams()
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [sectionScroll, setSectionScroll] = useState(0)
  const token = cookies.get('ut')
  let ct

  function getBlogDate (myDate) {

    let newDate = new Date(myDate)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year} | ${month<10?`0${month}`:`${month}`} | ${date}`
    
  }

  const getComments = () => {
    fetch(`${DOMAIN}/comment/by-blog/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json())
      .then((data) => {
        setComments(data)
    })
  }

  const submitComment = () => {
    if (!token) return toast.warn("You have to login before submiting a comment!")
    
    fetch(`${DOMAIN}/comment/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': `application/json`,
        'auth': `ut ${token}`
      },
      body: JSON.stringify({
        text: comment,
        blogId: params.id
      }),
    }).then((res) => res.json())
      .then((data) => {
        if (data.msg === 'ok') {
          setComment("")
          getComments()
          toast.success("Your comment submited successfully!")
        }
      })
  }

  const submitRate = (newRating) => {
    if (!token) return toast.warn("You have to login before submiting a rate!")

    fetch(`${DOMAIN}/blog/submit-rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth' : `ut ${token}`
      },
      body: JSON.stringify({
        blogId: params.id,
        score: Number(newRating)
      })
    }).then((res) => res.json())
    .then(data => console.log(data))
    .then(() => {
      return toast.success("Your rate submited successfully!")
    })
  }
  
  useEffect(() => {
    fetch(`${DOMAIN}/blog/single-blog/${params.id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json())
      .then((data) => {
        setBlog(data)
        getComments()
        setLoading(false)
      })

  }, [])

  if (scrollRef && scrollRef.current) {
    ct = scrollRef.current.offsetHeight

    // console.log('*********')
    // console.log(scrollRef.current) 
    // console.log(scrollRef.current.scrollTop )
    // console.log('*********')
  }

  
  
  if(loading) return <Loading />
  return (
    <div className=" m-auto md:w-2/3 w-5/6 text-gray-800 h-min-screen mb-8">
          <p onClick={() => navigate(-1)} className="my-4 w-max bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-2xl text-gray-600 cursor-pointer text-sm">Go Back</p>
      <div className="m-auto">
      <img className=" shadow-md	shadow-blue-700/10 rounded-2xl m-auto w-full z-0 h-96 object-cover my-8 opacity-80" src={blog.imgurl} onError={(e) => e.target.src=BlogImage}></img>
        </div>
      <div>
        <a href={`/blog/${params.id}`}><h1 className="mb-1 text-2xl font-bold">{blog.title}</h1></a>
        <div className="text-sm font-light"><span>Published Date: </span><span>{getBlogDate(blog.createdAt)}</span></div>
        <div className="mb-4">
                      <ReactStars
                      count={5}
                      value={blog.averageScore}
                      size={24}
                      edit={false}
                      activeColor="#ffc200"
                      />
        </div>
        
        <div className="border-b-2 border-slate-200	mb-2"></div>
        <div className="text-justify md:pl-4 font-light" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      </div>
      <div className="flex flex-row bg-gray-800 mt-4 mb-8 md:ml-4 p-4 rounded-2xl">
        <div>
        <img className="w-32 rounded-full mr-4 " src={`${DOMAIN}/${blog.creator.avatar}`} onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqGG1REKqgE2MNG8gLCJh5BEujRypjNSJsg&usqp=CAU"}></img>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-1"><span className="text-white">Author: </span><a href={`/author/${blog.creator._id}`}><span className="text-gray-300 hover:text-white cursor-pointer">{blog.creator.name}</span></a></div>
          <div className="mb-1"><span className="text-white">Shared Blogs: </span><span className="text-gray-300 hover:text-white cursor-pointer">{blog.creator.blogs.length}</span></div>
          <div className="flex"><span className="text-white mt-1">Rate: </span><span className="ml-1 text-gray-300 hover:text-white cursor-pointer">
          <ReactStars
                      count={5}
                      value={blog.creator.averageScore}
                      size={20}
                      edit={false}
                      activeColor="#ffc200"
                      />
          </span></div>
        </div>
      </div>
      <div className="md:flex md:pl-4 ">
          <div className="md:w-1/2 md:mt-0 mt-12">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment..." rows="8" className="bg-gray-100 focus:bg-gray-200 w-full pl-4 pt-4 rounded-2xl"></textarea>
          <div className="flex flex-row justify-between  mt-2">
            <div className="flex"><span className="mt-1 text-base mr-1">Rate This Blog! </span>
            <ReactStars
              count={5}
              value={blog.creator.averageScore}
              size={20}
              onChange={submitRate}
              activeColor="#ffc200"
              />
            </div>
            <div className="text-right">
            <button onClick={submitComment} className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-6 py-2 cursor-pointer text-base">Enter</button>
            </div>
          </div>
          </div>
          <div className="md:w-1/2 flex flex-col md:pl-4 md:my-0 my-8">
          <h1 className="font-semibold text-lg mb-2">Comments</h1>
          {
            comments.length !== 0 ?
              <>
                <div
                  style={{height: "14rem"}}
                  onScroll={e => {
                    const st = e.target.scrollTop

                    const scrollPercent = (st / (ct - e.target.offsetHeight )) * 100
                    console.log('*****************')
                    console.log("scrollPercent : ", scrollPercent)
                    console.log('*****************')
                    setSectionScroll(scrollPercent)
                  }}
                  className="overflow-y-scroll pr-2"
                  >
                  <div
                    ref={scrollRef}
                  >
                    {
                      comments.map(comment => {
                        return (
                          <div className="bg-gray-100 mb-4 p-4 rounded-2xl">
                            <div className="flex mb-1">
                            <a href={`/author/${comment.user._id}`}><img className="hidden md:block w-8 h-8 rounded-full" src={`${DOMAIN}/${comment.user.avatar}`} onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqGG1REKqgE2MNG8gLCJh5BEujRypjNSJsg&usqp=CAU"}></img></a>
                            <a href={`/author/${comment.user._id}`}><span className="text-sm md:ml-2 mt-2 font-semibold">{comment.user.name}</span></a>
                            </div>
                            <div className="">
                            {comment.text}
                            </div>
                          </div> 
                        )
                      })
                    }
                  </div>
                </div>

              <div className={`${sectionScroll > 100 || ct < 200 ? "opacity-0" : "opacity-100"} transition-opacity duration-300 bg-gradient-to-t from-white h-28 w-calc[100%-10px] mr-[10px] -mt-28`}></div>
              </>
              :
              <p className="font-semibold">Be the first one who comments!</p>
          }
          </div>
        </div>
    </div>
  )
}

export default Blog