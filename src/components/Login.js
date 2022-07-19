import { useState, useEffect } from "react"
import { DOMAIN } from "../config/constants"
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { setUser } from "../Global State/Slice";
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

const cookies = new Cookies();

const Login = () => {
  const nav = useNavigate()
  const dispatch = useDispatch() 
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [invalid, setInvalid] = useState("")

  const fetchMe = () => {
    const token = cookies.get('ut')

    fetch(`${DOMAIN}/user/me`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        "auth": `ut ${token}`
      },
      body: "{}",
    }).then((res) => res.json())
      .then((data) => {
      dispatch(setUser(data))
      nav("dashboard")
    })
  }

  const onsubmit = async () => {
    const res = await fetch(`${DOMAIN}/user/login`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    });
    const data = await res.json()
    if(data.token === undefined) return toast.error("Username or password are wrong. Please try again!")
    cookies.set('ut', data.token);
    fetchMe() 
    toast.success("You've logged in successfully!")
  }

  return (

    <div className=" bg-white z-20 fixed w-5/6 h-[calc(1/4 + 1/6)] m-auto left-[calc(50vw-42%)] top-[calc(50vh-17%)] lg:w-1/3 lg:h-1/4 px-10 lg:top-[calc(50vh-16.5%)] lg:left-[calc(50vw-16.5%)] rounded-2xl shadow-md shadow-blue-700/10 justify-center">
        <h1 className="text-blue-700 mt-5 font-semibold	text-xl	">Login</h1>
        <div className="h-8 mt-2 text-sm text-gray-600">{invalid}</div>
        <div className="flex mt-2 ">
        <div className="w-1/2">
      <input placeholder="Username" className="text-gray-600 w-full py-3 pl-2 border border-solid	border-gray-200	rounded-xl" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className="w-1/2 ml-2">
      <input type ="password"  placeholder="Password" className="text-gray-600 w-full py-3 pl-2 border border-solid	border-gray-200	rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      </div>
      <div>
      <button onClick={onsubmit} className="w-full mt-3 mb-12 py-3 text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-base px-4 mr-2 ">Login</button>
        </div>
      </div>

  )
}

export default Login