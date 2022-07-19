import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const WebLayout = () => {

  return (
    <div>
    <Header />
    <Outlet />
    <Footer />
    </div>
  )
}

export default WebLayout