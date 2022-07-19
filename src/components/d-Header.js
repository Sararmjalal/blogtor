import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, logOut } from "../Global State/Slice";
import Logo from "../Logo.png"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const DashboardHeader = () => {

const [mobMenu, setMobMenu] = useState(false)
const thisUser = useSelector(selectUser)
const nav = useNavigate()
const dispatch = useDispatch()

const logout = () => {
    dispatch(logOut())
    cookies.remove('ut')
    nav("/")

}
    return (
        <div className="shadow-md	shadow-gray-700/10 pt-1.5">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="/" className="flex items-center">
                    <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">Blogtor</span>
                </a>
                <div className="flex items-center lg:order-2">
                <p onClick={logout} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 cursor-pointer">Logout</p>
                              <a href="/dashboard/profile/edit"><p className="text-white bg-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:ring-4 focus:ring-gray-400">Hello {thisUser.name}!</p></a>
                                
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false" onClick={() => setMobMenu(!mobMenu)}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                </div>
            </div>
          </nav>
                  {
                    mobMenu ?
                    <div className="bg-gray-800 h-full justify-between items-center w-1/2 sm:w-1/4 lg:hidden absolute right-0 z-10">
                        <ul className="text-center">
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
                      :
                      ""
                  }
        </div>
      )
}

export default DashboardHeader