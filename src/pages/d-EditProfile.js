import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { selectUser } from "../Global State/Slice";
import { DOMAIN } from "../config/constants";
import { toast } from 'react-toastify';
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const EditProfile = () => {
  const [loading, setLoading] = useState(true)
  const thisUser = useSelector(selectUser)
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [file, setFile] = useState(null)
  const token = cookies.get('ut')
  const [img, setImg] = useState("")


  useEffect(() => {
    if (file) {

      const fileReader = new FileReader()

      fileReader.onload = function (e) {
        setImg(e.target.result)
      }

      fileReader.readAsDataURL(file)
    }
  }, [file])

  useEffect(() => {
    fetch(`${DOMAIN}/user/singleUser/${thisUser._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .then((data) =>
      {
        setName(data.name)
        setBio(data.bio)
        setImg(`${DOMAIN}/${data.avatar}`)
      })
    .then(setLoading(false))
  }, [])

  const submitAvatar = async () => {
    try {

      console.log('submit avatar called')
      
      if (!file) return

      const formData = new FormData()
      formData.append('avatar', file)

      fetch(`${DOMAIN}/user/update-avatar`, {
        method: 'POST',
        headers: {
          'auth': `ut ${token}`
        },
        body: formData
      }).then(res => {
        console.log(res)
        
      }).then((data) => {
        console.log(data)
      })

    } catch (error) {
      console.log('lol')
    }
  }

  const done = () => {
    fetch(`${DOMAIN}/user/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': `ut ${token}`
      },
      body: JSON.stringify({
        name,
        bio,
      }),
    }).then((res) => res.json())
      .then((data) => {
        submitAvatar()
      }).then(toast.success("Your profile has been updated successfully!"))
    
  }
  
  if(loading) return <Loading />
  return (
    <div className="lg:w-[calc(100vw-24rem)] m-6 md:m-12 text-gray-800">
      <h1 className="text-2xl font-semibold mb-2">Edit Profile</h1>
      <div className="border-b-2 border-slate-200	mb-8"></div>
      <div className="block md:flex">
        <div className="md:w-1/2 m-auto w-max flex flex-col justify-center items-center">
          <label for="fileInput">
            <img
              className="mb-4 cursor-pointer w-52 h-52 rounded-full shadow-md	shadow-blue-700/10"
              src={img}
              onError={(e) => setImg("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqGG1REKqgE2MNG8gLCJh5BEujRypjNSJsg&usqp=CAU")}
            >
            </img></label>
          <p className="mb-4 text-base font-semibold focus:ring-4 focus:ring-gray-400">Change Avatar</p>
          <div className="mb-8">
          <input id="fileInput" className="opacity-0 w-[0.1px] h-[0.1px] absolute" onChange={(e) => setFile(e.target.files[0])} type="file" name="avatar" accept="image/png, image/jpeg"></input>
          <label for="fileInput" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-6 py-2.5 cursor-pointer">Select Avatar</label>
          </div>
        </div>
        <div className="md:w-1/2 block">
          <div><input value={name} onChange={(e) => setName(e.target.value)} className="w-full py-2 pl-2 border-2 rounded-lg mb-4" placeholder="Name"></input></div>
          <div><textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full py-2 pl-2 border-2 rounded-lg mb-2" placeholder="Bio..." maxLength="200" rows="7"></textarea></div>
          <div onClick={done} className="text-right"><button className="focus:ring-4 focus:ring-gray-400 text-white bg-gray-800 font-medium rounded-lg text-sm px-6 py-2.5 ">Done</button></div>
        </div>
      </div>
      </div>
  )
}

export default EditProfile 