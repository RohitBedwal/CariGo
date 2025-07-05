import React from 'react'

const DriverDetails = () => {
  return (
    <div>
        <div className='  flex items-center justify-between border-b-2 p-4 border-gray-300'>
          <div className='flex items-center gap-x-4'>
            <img className='h-16 rounded-full' src="./src/images/man2.png" alt="" />
            <h2 className='font-semibold text-lg'>Ankit Gari</h2>
          </div>
          <div className='flex flex-col  text-end'>
            <h5 className='text-xl font-bold '>₹500.32</h5>
            <p className='text-sm text-gray-500'>Earned</p>
          </div>
        </div>


        <div className='flex justify-between items-center bg-[#E2E2E2] m-4 rounded-lg p-2'>
          <div className='flex flex-col items-center'>
            <i className="font text-2xl ri-timer-2-line"></i>
            <h4 className='font-bold'>10.4</h4>
            <h5 className='text-sm'>hours Online</h5>
          </div>
          <div className='flex flex-col items-center'> 
            <i className=" text-2xl ri-history-line"></i>
            <h4 className='font-bold'>10.4</h4>
            <h5 className='text-sm'>hours Online</h5></div>
          <div className='flex flex-col items-center'>
            <i className="text-2xl ri-timeline-view"></i>
            <h4 className='font-bold'>10.4</h4>
            <h5 className='text-sm'>hours Online</h5>
          </div>
        </div>

    </div>
  )
}

export default DriverDetails