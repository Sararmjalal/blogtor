import React from "react";

const Footer = () => {
  return (
    <div className="block md:flex h-max bg-gray-800 md:min-h-64 p-10 max-h-max md:px-24">
      <div className="w-full md:w-1/2 mr-12 md:mb-0 mb-12">
        <h3 className="font-semibold text-lg mb-4 text-white">About Blogtor</h3>
        <p className="text-gray-400 font-extralight lg:w-96 md:w-72 md:text-justify	">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
      <div className="w-full md:w-1/2 md:mb-0 mb-12">
        <h3 className="font-semibold text-lg mb-4 text-white">Quick Access</h3>
        <ul className="font-extralight text-gray-400">
          <li className="mb-2"><a className="hover:text-white" href="/">Home</a></li>
          <li className="mb-2"><a className="hover:text-white" href="/blogs">Blogs</a></li>
          <li className="mb-2"><a className="hover:text-white" href="/authors">Authors</a></li>
          <li className="mb-2"><a className="hover:text-white" href="/dashboard">Dashboard</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer