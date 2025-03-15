import React from 'react'

const WaitingForDriver = () => {
  return (
    <div className='sm:flex  sm:w-full  sm:bg-[#cbd5e1]'>
      <div className=' sm:w-[400px] sm:bg-white'>
        <div className='relative flex flex-col bg-white w-full  p-2  '>
          
            
        </div>
        <div className='flex items-center justify-between border-b-2 p-4 border-gray-300'>
          <img className='h-22' src="./src/images/car2.png" alt="" />
          <div className='flex flex-col  text-end'>
            <h2 className='font-semibold text-lg'>Rohit</h2>
            <h5 className='text-2xl font-bold '>DL 1PC 0000</h5>
            <p className='text-sm'>Maruti Suzuki Dzire</p>
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
          <div className='p-6'><i className="ri-square-fill"></i></div>
          <div className='border-b-2 pb-2 border-gray-300 w-full'>
            <h2 className='font-bold text-xl'>₹193.5</h2>
            <h3>Cash Cash</h3>
          </div>
        </div>


    </div>
    </div>
  )
}

export default WaitingForDriver