import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { DOMAIN } from '../config/constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const CreateBlog = () => {
  const navigate = useNavigate()
  const editorRef = useRef(null);
  const [title, setTitle] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  
  
  const publish = () => {

    const token = cookies.get('ut')
    if(!title || !imgUrl) return toast.warn("Please fill out all inputs!")

    fetch(`${DOMAIN}/blog/write`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth": `ut ${token}`
      },
      body: JSON.stringify({
        title: title,
        content: editorRef.current.getContent(),
        imgurl: imgUrl
      }),
    }).then((res) => res.json())
      .then(toast.success("You successfully posted your blog!"))
      .then(navigate('/dashboard/blogs'))
  }


  return (
    <div className="lg:w-[calc(100vw-24rem)] m-6 md:m-12 text-gray-800">
      <h1 className="text-2xl font-semibold mb-2">Create new blog</h1>
      <div className="border-b-2 border-slate-200	mb-2"></div>
      <p className='mb-8'>You can add your new blog here!</p>
      <div className='mb-4'>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='w-[calc(65%-8px)] py-2 pl-2 border-2 rounded-lg mb-4 mr-2'></input>
        <input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder='Image Url' className='w-[calc(35%-8px)] py-2 pl-2 border-2 rounded-lg mb-4'></input>
        <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          init={{
            height: 500,
            menubar: false,
            body_class:'h-2',
          }}
        />
      </div>
      <div className='text-right'>
        <button onClick={publish} className="text-white bg-gray-800 font-medium rounded-lg text-sm px-6 lg:px-8 py-2 lg:py-2.5 focus:ring-4 focus:ring-gray-400">Publish</button>
      </div>
      </div>
  );
}

export default CreateBlog 