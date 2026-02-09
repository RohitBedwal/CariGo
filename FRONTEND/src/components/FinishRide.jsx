import React from 'react'

const FinishRide = (props) => {
  const { ride, onFinish, errorMsg } = props;
  return (
    <div className=''>
        <div onClick={()=>props.setFinishRide(false)} className='text-center'>
        <i className="ri-arrow-down-wide-line text-2xl text-gray-500 "></i>
        </div>
    <div className='  flex items-center justify-between border-b-2 p-4 border-gray-300 '>
    
     <div className='flex items-center gap-x-4'>
       <img className='h-16 rounded-full' src="./src/images/man2.png" alt="" />
       <h2 className='font-semibold text-lg'>Ride Details</h2>
     </div>
     <div className='flex flex-col  text-end'>
       <h5 className='text-xl font-bold '>{ride?.distance ? `${(ride.distance/1000).toFixed(1)} km` : '—'}</h5>
       <p className='text-sm text-gray-500'>distance</p>
     </div>
   </div>

   <div className='flex items-center justify-start '>
     <div className='p-6'><i className="ri-map-pin-range-fill"></i></div>
     <div className='border-b-2 pb-2 border-gray-300 w-full'>
      <h2 className='font-bold text-xl'>Pickup</h2>
      <h3>{ride?.pickup ?? '—'}</h3>
     </div>
   </div>

   <div className='flex items-center justify-start '>
     <div className='p-6'><i className="ri-square-fill"></i></div>
     <div className='border-b-2 pb-2 border-gray-300 w-full'>
      <h2 className='font-bold text-xl'>Drop Off</h2>
      <h3>{ride?.destination ?? '—'}</h3>
     </div>
     </div>
   <div className='flex items-center justify-start '>
     <div className='p-6'><i className="ri-money-rupee-circle-fill text-xl"></i></div>
     <div className='border-b-2 pb-2 border-gray-300 w-full'>
      <h2 className='font-bold text-xl'>₹{ride?.fare ?? '—'}</h2>
      <h3>Cash</h3>
     </div>
     </div>

       {errorMsg && (
         <div className='px-6 py-2 text-red-600 text-sm'>
           {errorMsg}
         </div>
       )}

     <div className='flex items-center justify-center w-full'>
     <button
       type='button'
       disabled={ride?.status !== 'ongoing'}
       onClick={()=>{ if (ride?.status === 'ongoing' && typeof onFinish === 'function') onFinish(); }}
       className={`rounded-lg text-white font-semibold text-lg p-1.5 m-2 w-full ${ride?.status !== 'ongoing' ? 'bg-blue-400/60 cursor-not-allowed' : 'bg-blue-400'}`}
     >
       Finish Ride
     </button>
 </div>
  

</div>
  )
}

export default FinishRide