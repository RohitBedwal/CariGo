import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    const [email,setEmail]=useState('');
      const [password,setPassword]=useState('');
      const [captainData , setCaptainData]=useState({});
    
      function submitHandler(e){
        e.preventDefault();
        setCaptainData({
          email:email,
          password:password
        })
        
        setEmail('');
        setPassword('');
        
       
      }
  return (
    <div className='h-screen w-full flex flex-col justify-between '>
     <div >
     <div className='h-[15vw] w-full flex mb-[10vw] bg-white text-black'>
        <h3 className='text-[9vw] ml-[7vw] '>Uber <i className="ri-arrow-right-line items-end "></i></h3>
      </div>
      <form onSubmit={(e)=>submitHandler(e)}   className='mt-[4vw] mx-[5vw] flex flex-col gap-y-4'>
         <h3 className='font-semibold'> What's  your Email  :</h3>
         <input value={email} onChange={(e)=>setEmail(e.target.value)} className=' p-[3vw] rounded bg-gray-300' required type="email"  placeholder='Email address'/>
          <h3 className='font-semibold'> Your Password :</h3>
          <input value={password} onChange={(e)=>setPassword(e.target.value)}  className=' p-[3vw] rounded bg-gray-300' required type="password"  placeholder='Password'/>

          <button className='text-center text-white bg-black  rounded-lg py-[3vw] mt-[7vw] '>Login In</button>
          <h3 className='text-center'>Register as captain ? <Link className='text-[#28a25d]' to="/captain-signup">Create Account</Link></h3>
          

      </form>
     </div>
      <div className='mt-[4vw] mx-[5vw] flex flex-col gap-y-4'>

      <Link className='text-center  text-white bg-[#00cefd]  rounded-lg py-[3vw] mb-[7vw]' to="/login">Sign In as User </Link>
      </div>

      
    </div>
    
  )
}

export default CaptainLogin