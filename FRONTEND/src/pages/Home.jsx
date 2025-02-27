import React from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const Home = () => {
  return (
    <div>
      <div className='h-screen w-full justify-between flex flex-col bg-cover bg-[url(./src/images/uberHomePage.jpeg)]' >
        <img className=' w-[15vh] mt-[7vh] ml-[3vh] ' src="./src/images/uberLogo.png"  alt="" />
        <div className='bg-slate-200 flex flex-col  '>
          <h2 className='font-semibold text-[7vw] mt-[5vw] mx-[5vw]'>Get started with Uber</h2>
          <Link to="/login" className='text-center text-white bg-black mx-[4vw] rounded-lg py-[3vw] my-[7vw]  '>Continue  <i className="ri-arrow-right-line items-end "></i></Link>
        </div>
      </div>
    </div>
  )
}

export default Home