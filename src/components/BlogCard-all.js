import BlogImage from "../uploads/BlogImage.jpg"
import { useRef } from "react"
import { DOMAIN } from "../config/constants"
import ReactStars from "react-rating-stars-component";

const BlogCard = ({ blog }) => {
  const contentRef = useRef(null)

  function getCurrentDate() {

    let newDate = new Date(blog.createdAt)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return`${year} | ${month<10?`0${month}`:`${month}`} | ${date}`
    
  }

  if(contentRef.current) {
    contentRef.current.innerHTML = blog.content
    contentRef.current.innerHTML = contentRef.current.children[0]?.innerText.length > 50 ? contentRef.current.children[0].innerText.slice(0, 50) + " ..." : contentRef.current.children[0].innerText
  }

  return (
    <div className="flex flex-col mb-4 shadow-md	shadow-blue-700/10 mx-4 rounded-2xl overflow-hidden">
    <a href={`/blog/${blog._id}`}><img className="cursor-pointer opacity-80 aspect-square object-cover mb-4" src={blog.imgurl} onError={(e) => e.target.src=BlogImage}></img></a>
      <div className="px-4">
        <a href={`/blog/${blog._id}`}><h3 className="font-semibold lg:text-lg text-base mb-2">{blog.title.length > 15 ? blog.title.slice(0, 15) + "..." : blog.title}</h3></a>
            <p ref={contentRef} className="text-gray-500 xl:h-10 md:h-14 sm:h-10 mb-2 text-[14px]"></p>
      </div>
      <a href={`/blog/${blog._id}`}><button className="text-left px-4 text-blue-700 font-semibold cursor-pointer w-max text-sm">Read more</button></a>
      <div className="flex mb-4 ml-4">
          <span>
          <ReactStars
            count={5}
            value={blog.averageScore}
            size={17}
            edit={false}
            activeColor="#ffc200"
            />
          </span>
          <span className="text-sm ml-1 mt-0.5 text-gray-700">({blog.rateCount})</span>
        </div>
      <div className="border-b-2 border-slate-200	mb-2"></div>
      <div className="flex flex-row px-4 pb-4">
        {
          blog.creator ? 
          <div className="flex w-1/3 h-6">
          <a href={`/author/${blog.creator?._id}`}><img className="hidden md:block rounded-full h-full aspect-square object-cover" src={`${DOMAIN}/${blog.creator.avatar}`} onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqGG1REKqgE2MNG8gLCJh5BEujRypjNSJsg&usqp=CAU"}></img></a>
          <a href={`/author/${blog.creator?._id}`}><span className="text-sm md:ml-2 mt-1.5 font-semibold">{blog.creator.name}</span></a>
        </div>
        :
        ""
        }
        <div className={`text-right ${blog.creator? "w-2/3" : "w-full"}`}>
        <p className={`font-semibold text-gray-500 text-xs md:text-sm text-${blog.creator? "right": "left"} mt-1.5`}>{blog.creator? getCurrentDate(): "Written On:  " + getCurrentDate()}</p>
        </div>
    </div>
  </div>
    )
    
}

export default BlogCard