import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import WebLayout from "./layouts/WebLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import Home from "./pages/Home"
import AllBlog from './pages/All Blog';
import AllAuthors from './pages/All Authors';
import Author from './pages/Author';
import Blog from './pages/Blog';
import Dashboard from './pages/d-Dashboard';
import BlogList from './pages/d-Bloglist';
import CreateBlog from './pages/d-CreateBlog';
import EditBlog from './pages/d-EditBlog';
import EditProfile from './pages/d-EditProfile';

import { useDispatch } from 'react-redux'
import { setUser} from "./Global State/Slice";
import { DOMAIN } from "./config/constants"
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from './components/Loading';
import NotFound from './pages/NotFound';

const cookies = new Cookies();

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch() 

  useEffect(() => {
    
    const token = cookies.get('ut')

    if (!token) return setLoading(false)
    
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
        setLoading(false)
      })
    
  }, [])


  if (loading) return <Loading />
  
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />

  <Router>
        <Routes>
          
        <Route path='*' element={<NotFound />}/>
        
        <Route path='/' element={<WebLayout />}>
          <Route path='' element={<Home />} />
          <Route path='blogs' element={<AllBlog />} />
          <Route path='authors' element={<AllAuthors />} />
          <Route path='author/:id' element={<Author />} />
          <Route path='blog/:id' element={<Blog />} />
        </Route>

        <Route path='/dashboard/' element={<DashboardLayout />}>
          <Route path='' element={<Dashboard />} />
          <Route path='blogs' element={<BlogList />} />
          <Route path='blogs/create' element={<CreateBlog />} />
          <Route path='blogs/edit/:id' element={<EditBlog />} />
          <Route path='profile/edit' element={<EditProfile />} />
        </Route>
        
    </Routes>
  </Router>
    </>
    
  )
  
}

export default App;
