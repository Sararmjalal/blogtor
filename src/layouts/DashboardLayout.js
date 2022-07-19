import { Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/d-Header";
import DashboardMenu from "../components/d-Menu";
import { useSelector } from 'react-redux'
import { selectUser } from "../Global State/Slice";
import { useEffect } from "react";

const DashboardLayout = () => { 
  const nav = useNavigate()
  const thisUser = useSelector(selectUser)

  useEffect(() => {
    if(!thisUser) return nav("/")
  }, [])

  return (
    <div>
    <DashboardHeader />
    <DashboardMenu />
    <Outlet />
    </div>
  )
}

export default DashboardLayout