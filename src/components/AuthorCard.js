import ReactStars from "react-rating-stars-component";
import { DOMAIN } from "../config/constants";

const AuthorCard = ({author}) => {
    return(
        <a href={`/author/${author._id}`}>
        <div className="mt-4 m-2 p-4 rounded-2xl shadow-md	shadow-blue-700/10">
          <div className="flex">          
              <img className="w-24 h-24 rounded-full mr-4 shadow-md	shadow-blue-700/10" src={`${DOMAIN}/${author.avatar}`} onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqGG1REKqgE2MNG8gLCJh5BEujRypjNSJsg&usqp=CAU"}></img>
            <div className="flex flex-col">
              <h3 className="font-semibold lg:text-lg text-base mb-2">{author.username}</h3>
              <div className="mb-0.5">
                <ReactStars
                count={5}
                value={author.averageScore}
                size={20}
                edit={false}
                activeColor="#ffc200"
                />
              </div>
              <button className="text-blue-700 font-semibold text-sm p-0 text-left">View Profile</button>
            </div>
          </div>
          </div> 
          </a>
    )
}

export default AuthorCard