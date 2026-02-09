import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token) return;
    // Try user profile first
    fetch(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res)=>{
      if(res.status === 200){
        navigate('/userHome');
      }else{
        // Try captain profile
        fetch(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((cres)=>{
          if(cres.status === 200){
            navigate('/captainHome');
          }
        })
        .catch(()=>{})
      }
    })
    .catch(()=>{})
  },[])
  return (
    <div className='sm:flex sm:w-full sm:justify-center sm:bg-slate-300 bg-white'>
      <div className='h-screen w-full justify-between   flex flex-col bg-cover bg-[url(./src/images/CariGOHomePage.jpeg)]    sm:w-[400px]    ' >
        <img className=' w-20 mt-14 ml-6 ' src="./src/images/CariGOLogo.png"  alt="" />
        <div className='bg-slate-200 flex flex-col w-full '>
          <h2 className='font-semibold text-2xl mt-5  mx-5'>Get started with CariGO</h2>
          <Link to="/login" className='text-center text-white bg-black mx-4 rounded-lg py-3 my-7  '>Continue  <i className="ri-arrow-right-line items-end "></i></Link>
        </div>
      </div>
      
    </div>
  )
}

export default Home