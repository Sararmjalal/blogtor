const NotFound = () => {
return(
  <div className="min-h-screen">
      <div className="absolute sm:top-[calc(50vh-11rem)] sm:left-[calc(50vw-21rem)] top-[calc(50vh-16rem)] left-[calc(50vw-11rem)] flex">
    <div className="sm:flex block sm:h-[22rem] sm:w-[42rem] h-[32rem] w-[22rem] text-gray-800">
    <div className="w-max">
      <p className="text-[200px] sm:ml-0 ml-4">404</p>
    </div>
    <div className="sm:w-1/2 w-full flex flex-col justify-center ml-4">
      <p className="text-[67px]">Not Found</p>
        <p>The page you are looking for was not found.</p>
        <a href="/">
        <button className="my-8 py-2 w-max bg-gray-100 hover:bg-gray-200 px-4 rounded-2xl text-gray-600 cursor-pointer text-sm">Go to Home</button>
        </a>
      </div>
  </div>
  </div>
  </div>
)
}

export default NotFound