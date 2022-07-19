import React from "react";
import { useSelector } from 'react-redux'
import { selectUser } from "../Global State/Slice";

const Dashboard = () => {
  const thisUser = useSelector(selectUser)

  return (
    <div className="lg:w-[calc(100vw-24rem)] m-6 md:m-12 text-gray-800">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <div className="border-b-2 border-slate-200	mb-2"></div>
      <div className="text-lg mb-1"><span>Welcome</span><span className="font-semibold"> {thisUser.name}</span>!</div>
      <p> This is your dashboard, where you can add blogs, manage them and edit your profile. Enjoy! </p>
    </div>

  )
}

export default Dashboard 