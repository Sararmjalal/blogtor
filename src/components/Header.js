import React, { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";
import { selectUser, logOut } from "../Global State/Slice";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Logo from "../Logo.png"

const cookies = new Cookies();

const Header = () => {

const [showMobMenu, setShowMobMenu] = useState(false)
const [showLogin, setShowLogin] = useState(false)
const [showSignUp, setShowSignUp] = useState(false)
const thisUser = useSelector(selectUser)
const dispatch = useDispatch()
const navigate = useNavigate()


const logout = () => {
dispatch(logOut())
navigate("/")
}

  return (
    <div className="shadow-md	shadow-blue-700/10 z-100">
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
                <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
                <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">Blogtor</span>
            </a>
            <div className="flex items-center lg:order-2">
            {
                          thisUser._id ? 
                          <>
                          <p className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 cursor-pointer" onClick={logout}>Logout</p>
                          <p className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 cursor-pointer" onClick={() => navigate("dashboard")}>Dashboard</p>
                            </>
                              :
                              <>
                                <p className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 cursor-pointer" onClick={() => setShowLogin(!showLogin)}>Login</p>
                                <p className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 cursor-pointer" onClick={() => setShowSignUp(!showSignUp)}>Get started</p>
                              </>
            }
            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false" onClick={() => setShowMobMenu(!showMobMenu)}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="/" className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${"/" === window.location.pathname ? " text-blue-700":" text-gray-800 "}`}>Home</a>
                    </li>
                    <li>
                        <a href="/blogs" className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${"/blogs" === window.location.pathname ? " text-blue-700":" text-gray-800 "}`}>Blogs</a>
                    </li>
                    <li>
                        <a href="/authors" className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${"/authors" === window.location.pathname ? " text-blue-700":" text-gray-800 "}`}>Authors</a>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
      {
        showLogin ? 
        <>
        <div className="bg-black fixed top-0 left-0 w-screen h-screen opacity-50 z-20" onClick={() => setShowLogin(false)}></div>
        <Login />
        </>
      : ""
      }

      {
        showSignUp ? 
          <>
            <div className="bg-black fixed top-0 left-0 w-screen h-screen opacity-50 z-20" onClick={() => setShowSignUp(false)}></div>
          <Signup />
          </>
          : ""
          }
              {
                showMobMenu ?
                <div className="bg-white px-6 pb-6 rounded-l-3xl justify-between items-center w-1/2 md:w-1/3 lg:hidden absolute right-0 z-10 shadow-md	shadow-blue-700/10">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                        <a href="/" className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent  ${"/" === window.location.pathname ? " text-blue-700":" text-gray-800 "}`}>Home</a>
                    </li>
                        <li>
                        <a href="/blogs" className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent  ${"/blogs" === window.location.pathname ? " text-blue-700":" text-gray-800 "}`}>Blogs</a>
                    </li>          
                        <li>
                        <a href="/authors" className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent  ${"/authors" === window.location.pathname ? " text-blue-700":" text-gray-800 "}`}>Authors</a>
                    </li>
                </ul>
            </div>
                  :
                  ""
              }
    </div>
  )
}

export default Header