import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DOMAIN } from "../config/constants";
import { Editor } from '@tinymce/tinymce-react';
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const EditBlog = () => {
  const params = useParams()
  const navigate = useNavigate()
  const editorRef = useRef(null);
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${DOMAIN}/blog/single-blog/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .then((data) => {
        setTitle(data.title)
        setImgUrl(data.imgurl)
        setContent(data.content)
      })
    .then(setLoading(false))
  }, [])

  const publish = () => {
    const token = cookies.get('ut')
    
    fetch(`${DOMAIN}/blog/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth": `ut ${token}`
      },
      body: JSON.stringify({
        blogId: params.id,
        data: {
          title: title,
          content: editorRef.current.getContent(),
          imgurl: imgUrl
        }
      }),
      }).then((res) => res.json())
        .then((data) => {
        navigate("/dashboard/blogs")
      })
  }
  
  if(loading) return <Loading />
  return (
    <div className="lg:w-[calc(100vw-24rem)] m-6 md:m-12 text-gray-800">
      <h1 className="text-2xl font-semibold mb-2">Edit Blog</h1>
      <div className="border-b-2 border-slate-200	mb-2"></div>
      <p className='mb-8'></p>
      <div className='mb-4'>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='w-[calc(65%-8px)] py-2 pl-2 border-2 rounded-lg mb-4 mr-2'></input>
        <input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder='Image Url' className='w-[calc(35%-8px)] py-2 pl-2 border-2 rounded-lg mb-4'></input>
        <Editor
          initialValue={content}
          onInit={(evt, editor) => editorRef.current = editor}
          init={{
            height: 500,
            menubar: false,
            body_class:'h-2',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </div>
      <div className='text-right'>
        <button onClick={publish} className="text-white bg-gray-800 font-medium rounded-lg text-sm px-6 lg:px-8 py-2 lg:py-2.5 focus:ring-4 focus:ring-gray-400">Publish</button>
      </div>
      </div>
  );
}

export default EditBlog  