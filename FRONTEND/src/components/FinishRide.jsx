import React from 'react'

const FinishRide = (props) => {
  return (
    <div className=''>
        <div onClick={()=>props.setFinishRide(false)} className='text-center'>
        <i className="ri-arrow-down-wide-line text-2xl text-gray-500 "></i>
        </div>
    <div className='  flex items-center justify-between border-b-2 p-4 border-gray-300 '>
    
     <div className='flex items-center gap-x-4'>
       <img className='h-16 rounded-full' src="./src/images/man2.png" alt="" />
       <h2 className='font-semibold text-lg'>Abhay Kumar</h2>
     </div>
     <div className='flex flex-col  text-end'>
       <h5 className='text-xl font-bold '>3.3km</h5>
       <p className='text-sm text-gray-500'>away</p>
     </div>
   </div>

   <div className='flex items-center justify-start '>
     <div className='p-6'><i className="ri-map-pin-range-fill"></i></div>
     <div className='border-b-2 pb-2 border-gray-300 w-full'>
       <h2 className='font-bold text-xl'>A-542/P</h2>
       <h3>West vinod nagar ,New Delhi</h3>
     </div>
   </div>

   <div className='flex items-center justify-start '>
     <div className='p-6'><i className="ri-square-fill"></i></div>
     <div className='border-b-2 pb-2 border-gray-300 w-full'>
       <h2 className='font-bold text-xl'>c-42</h2>
       <h3>New York City,USA</h3>
     </div>
     </div>
   <div className='flex items-center justify-start '>
     <div className='p-6'><i className="ri-money-rupee-circle-fill text-xl"></i></div>
     <div className='border-b-2 pb-2 border-gray-300 w-full'>
       <h2 className='font-bold text-xl'>₹156.45</h2>
       <h3>cash cash</h3>
     </div>
     </div>

     <div className='flex items-center justify-center w-full'>
   
   <button  className=' rounded-lg bg-blue-400 text-white font-semibold text-lg p-1.5 m-2 w-full'>Finish Ride</button>
 </div>
  

</div>
  )
}

export default FinishRide