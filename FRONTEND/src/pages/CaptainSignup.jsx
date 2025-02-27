import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
  const [email,setEmail]=useState('');
    const [password,setPassword]=useState
    ('');
    const[firstname,setFirstname]=useState('');
    const[lastname,setLastname]=useState('');
    const [userData , setUserData]=useState({});

  
    function submitHandler(e){
      e.preventDefault();
      setUserData({
        fullname:{
          firstname:firstname,
          lastname:lastname
        },
        email:email,
        password:password
      })
      
      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
     
    }
  return (
    
    <div className='h-screen w-full flex flex-col justify-between '>
     <div >
     <div className='h-[15vw] w-full flex mb-[10vw] bg-white text-black'>
        <h3 className='text-[9vw] ml-[7vw] '>Uber <i className="ri-arrow-right-line items-end "></i> </h3>
      </div>

      
      <form onSubmit={(e)=>submitHandler(e)}   className='mt-[4vw] mx-[5vw] flex flex-col gap-y-4'>
      <h3 className='font-semibold'> What's your Name  :</h3>
        <div className='flex gap-x-4  '>
        <input value={firstname} onChange={(e)=>setFirstname(e.target.value)} className=' p-[3vw] w-1/2 rounded bg-gray-300' required type="text"  placeholder='first name'/>
         <input value={lastname} onChange={(e)=>setLastname(e.target.value)} className=' p-[3vw] w-1/2 rounded bg-gray-300'  type="text"  placeholder='last name'/>

        </div>
         <h3 className='font-semibold'> What's your Email  :</h3>
         <input value={email} onChange={(e)=>setEmail(e.target.value)} className=' p-[3vw] rounded bg-gray-300' required type="email"  placeholder='Email address'/>
          <h3 className='font-semibold'> Your Password :</h3>
          <input value={password} onChange={(e)=>setPassword(e.target.value)}  className=' p-[3vw] rounded bg-gray-300' required type="password"  placeholder='Password'/>

          <button className='text-center text-white bg-black  rounded-lg py-[3vw] mt-[7vw] '>Login In</button>
          <h3 className='text-center'>Already  a Captain? <Link className='text-[#066dfe]' to="/captain-login">Sign in </Link></h3>
          

      </form>
     </div>
      <div className='mt-[4vw] mx-[5vw] flex flex-col gap-y-4'>
      <p className='text-[3.5vw] leading-4 text-center mb-5'>
      By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.
      </p>
      </div>

      
    </div>
  )
}

export default CaptainSignup