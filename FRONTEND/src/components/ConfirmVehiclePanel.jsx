import React from 'react'

const ConfirmVehiclePanel = (props) => {
  console.log(props.vehicleType)
  return (
    <div className='sm:flex  sm:w-full  sm:bg-[#cbd5e1] '>
        <div className='sm:w-[400px] sm:bg-white '>
        <div className='relative flex flex-col bg-white w-full border-b-2  border-gray-300 p-2  '>
            <h5 onClick={()=>props.setConfirmVehiclePanel(false)}  className=' text-center right-8 text-2xl top-2'><i className="ri-arrow-down-wide-fill text-gray-400 text-3xl"></i></h5>
            <h4 className='font-semibold  text-xl '>confirm your ride</h4>
            
        </div>
        <div className='flex items-center justify-center border-b-2 border-gray-300'>
          <img className='h-32' src="./src/images/car2.png" alt="" />
        </div>
        <div className='flex items-center justify-start '>
          <div className='p-6'><i className="ri-map-pin-range-fill"></i></div>
          <div className='border-b-2 pb-2 border-gray-300 w-full'>
            <h2 className='font-bold text-xl'>A-542/P</h2>
            <h3>{props.pickup}</h3>
          </div>
        </div>

        <div className='flex items-center justify-start '>
          <div className='p-6'><i className="ri-square-fill"></i></div>
          <div className='border-b-2 pb-2 border-gray-300 w-full'>
            <h2 className='font-bold text-xl'>c-42</h2>
            <h3>{props.destination}</h3>
          </div>
        </div>
        <div className='flex items-center justify-start '>
          <div className='p-6'><i className="ri-square-fill"></i></div>
          <div className='border-b-2 pb-2 border-gray-300 w-full'>
            <h2 className='font-bold text-xl'>₹ {props.fair[props.vehicleType]}</h2>
            <h3>Cash Cash</h3>
          </div>
        </div>

      <div className='flex items-center justify-center w-full'>
        <button onClick={()=>{
          props.setLookingVehiclePanel(true);
          props.setConfirmVehiclePanel(false)
        }} className=' rounded-lg bg-green-400 text-white font-semibold text-lg p-1.5 m-2 w-full'>Confirm</button>
      </div>
        </div>

    </div>
  )
}

export default ConfirmVehiclePanel