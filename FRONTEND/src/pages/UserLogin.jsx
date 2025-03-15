import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { userDataContext } from '../../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {user , setUser}=useContext(userDataContext);
  const navigate = useNavigate()


  async function submitHandler(e){
    e.preventDefault();
    const userData = {
      email:email,
      password:password
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData);
    if(response.status==200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token)

      navigate ('/userHome')
    }
    setEmail('');
    setPassword('');
   
  }
  
  return (
   <div className='sm:flex sm:w-full sm:justify-center sm:bg-slate-300 bg-white  '>
     <div className='h-screen w-full flex flex-col justify-between  sm:w-[400px]  sm:bg-white '>
     <div >
     <div className='h-15 w-full flex mb-10 bg-white text-black'>
        <h3 className='text-4xl ml-7 '>Uber</h3>
      </div>
      <form onSubmit={(e)=>submitHandler(e)}   className='mt-5 mx-5 flex flex-col gap-y-4'>
         <h3 className='font-semibold'> What's your Email  :</h3>
         <input value={email} onChange={(e)=>setEmail(e.target.value)} className=' p-3 rounded bg-gray-300' required type="email"  placeholder='Email address'/>
          <h3 className='font-semibold'> Your Password :</h3>
          <input value={password} onChange={(e)=>setPassword(e.target.value)}  className=' p-3 rounded bg-gray-300' required type="password"  placeholder='Password'/>

          <button className='text-center text-white bg-black  rounded-lg py-3 mt-7 '>Login In</button>
          <h3 className='text-center'>New here? <Link className='text-[#066dfe]' to="/signup">Create New Account</Link></h3>
          

      </form>
     </div>
      <div className='mt-4 mx-5 flex flex-col gap-y-4'>

      <Link className='text-center  text-white bg-[#03e69a]  rounded-lg py-4 mb-7' to="/captain-login">Sign In as Captain </Link>
      </div>

      
    </div>
   </div>
  )
}

export default UserLogin