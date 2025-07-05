import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ConfirmRide = (props) => {

    const [otp ,setOtp] = useState();
    function submitHandler(e){
        e.preventDefault();

        console.log(otp)

        setOtp('');

    }

  return (
    <div className=''>
         <div className='flex items-center justify-between border-b-2 p-6 border-gray-300 '>
          <div className='flex items-center gap-x-4'>
            <img className='h-16 rounded-full' src="./src/images/man2.png" alt="" />
            <h2 className='font-semibold text-lg'>Abhay Kumar</h2>
          </div>
          <div className='flex flex-col  text-end'>
            <h5 className=' font-bold '> 3.3km</h5>
            <p className='text-sm text-gray-500'>away</p>
          </div>
        </div>

        
        <div className='flex items-center justify-start '>
          <div className='p-6'><i className="ri-square-fill"></i></div>
          <div className='border-b-2 pb-2 border-gray-300 w-full'>
            <h2 className='font-bold'>Drop Off:</h2>
            
            <h3>C-52,New York City,USA</h3>
          </div>
          </div>
          
          <form onSubmit={(e)=>{
            submitHandler(e)
          }} action="">
            <div className='flex items-center justify-center m-3' >
            <input onChange={(e)=>{setOtp(e.target.value)}} value={otp} className='w-70% text-center p-2  rounded  bg-gray-200' type="number"  placeholder='enter Otp'/>
            </div>

            <div className='flex items-center justify-center w-full'>
        <button onClick={()=>{
            props.setConfirmRide(false)
        }} className=' rounded-lg bg-red-400 text-white font-semibold text-lg p-1.5 m-2 w-full'>cancel</button>
        <Link to="/captain-riding" className=' rounded-lg bg-green-400 text-center text-white font-semibold text-lg p-1.5 m-2 w-full'>Confirm</Link>
      </div>

          </form>
          

       

    </div>
  )
}

export default ConfirmRide