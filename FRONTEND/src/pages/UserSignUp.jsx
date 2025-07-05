import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import  { userDataContext } from '../../context/UserContext'

const UserSignUp = () => {
  const {user,setUser}  = useContext(userDataContext)
  const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const[firstname,setFirstname]=useState('');
    const[lastname,setLastname]=useState('');
    // const [userData , setUserData]=useState({});
  const navigate = useNavigate()
  
  async function  submitHandler(e){
      e.preventDefault();
      const newUser= {
        fullname:{
          firstname:firstname,
          lastname:lastname
        },
        email:email,
        password:password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser)
      if (response.status==201){
        const data = response.data;
        setUser(data.user)
        localStorage.setItem('token',data.token)
        navigate('/userHome')
      }
      
      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
     
    }
  return (
    
    <div className='sm:flex sm:justify-center sm:w-full sm:bg-slate-300 bg-white'>
      <div className='h-screen w-full flex flex-col justify-between sm:w-[400px] sm:bg-white'>
     <div >
     <div className='h-10 w-full flex mb-10 bg-white text-black'>
        <h3 className='text-4xl ml-7 '>CariGO  </h3>
      </div>

      
      <form onSubmit={(e)=>submitHandler(e)}   className='mt-4 mx-5 flex flex-col gap-y-4'>
      <h3 className='font-semibold'> What's your Name  :</h3>
        <div className='flex gap-x-4  '>
        <input value={firstname} onChange={(e)=>setFirstname(e.target.value)} className=' p-3 w-1/2 rounded bg-gray-300' required type="text"  placeholder='first name'/>
         <input value={lastname} onChange={(e)=>setLastname(e.target.value)} className=' p-3 w-1/2 rounded bg-gray-300'  type="text"  placeholder='last name'/>

        </div>
         <h3 className='font-semibold'> What's your Email  :</h3>
         <input value={email} onChange={(e)=>setEmail(e.target.value)} className=' p-3 rounded bg-gray-300' required type="email"  placeholder='Email address'/>
          <h3 className='font-semibold'> Your Password :</h3>
          <input value={password} onChange={(e)=>setPassword(e.target.value)}  className=' p-3 rounded bg-gray-300' required type="password"  placeholder='Password'/>

          <button className='text-center text-white bg-black  rounded-lg py-3 mt-7 '>Create Account</button>
          <h3 className='text-center'>Already  a customer? <Link className='text-[#066dfe]' to="/login">Sign in </Link></h3>
          

      </form>
     </div>
      <div className='mt-4 mx-5 flex flex-col gap-y-4'>
      <p className='text-sm leading-4 text-center mb-5'>
      By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from CariGO and its affiliates to the number provided.
      </p>
      </div>

      
    </div>
    </div>
  )
}

export default UserSignUp