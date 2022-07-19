import { useEffect, useState, useRef } from "react"

const DashboardMenu = () => {
    const [scroll, setScroll] = useState(1)
    let y = window.scrollY

    const myScrollFunc = function () {
        setScroll(y)
        console.log(y)
      };
    
    useEffect(() => {
        window.addEventListener("scroll", myScrollFunc);
        
    }, [y])

    return(
        <div id="id" className={`hidden lg:block w-60 h-screen bg-gray-800 ${scroll > 60 ? "fixed" : "absolute"} right-0 bottom-autto top-${scroll > 60 ? "0" : ""} text-center`}>
                <ul>
                    <li>
                        <a href="/dashboard" className={`block py-6 text-base hover:bg-gray-900 ${"/dashboard" === window.location.pathname ? " text-white bg-gray-900":" text-gray-400 "}`}>Dashboard</a>
                    </li>
                    <li>
                        <a href="/dashboard/blogs" className={`block py-6 text-base hover:bg-gray-900 ${"/dashboard/blogs" === window.location.pathname ? " text-white bg-gray-900":" text-gray-400 "}`}>Blogs</a>
                    </li>
                    <li>
                        <a href="/dashboard/profile/edit" className={`block py-6 text-base hover:bg-gray-900 ${"/dashboard/profile/edit" === window.location.pathname ? " text-white bg-gray-900":" text-gray-400 "}`}>Edit Profile</a>
                    </li>
                </ul>
        </div>
    )
}

export default DashboardMenu