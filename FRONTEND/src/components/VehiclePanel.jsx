import React from 'react'
import ConfirmVehiclePanel from './ConfirmVehiclePanel';

const VehiclePanel = (props) => {
  return (
    <div className='sm:flex sm:flex-col   sm:w-full  sm:bg-[#cbd5e1] '>
        <div className='sm:w-[400px] sm:bg-white sm:p-2'>
        <div  className='flex  justify-between  '>
            <h3 className='text-2xl font-semibold pb-5'>Choose a Vehicle</h3>
            <h3 onClick={()=>{
                props.setVehiclePanel(false) 
                
            } }  className='font-bold text-2xl '><i className="ri-close-line"></i></h3>
            </div>
            <div onClick={()=>{
                props.setConfirmVehiclePanel(true);
                props.setVehicleType('car')
                props.setVehiclePanel(false)
            }} className='flex w-full border-2 rounded-2xl px-2 mb-3  items-center justify-between '>
            <img className='h-15' src="./src/images/car2.png" alt="" />
                <div className=' w-1/2'>
                <h4 className='font-medium'>goCar</h4>
                <h5 className='text-sm '>2 min away  <i className="ri-user-fill">4</i></h5>
                <p className='text-sm text-gray-500'>Affordable ,compact rides </p>
                </div>
                <h2>₹{props.fair.car}</h2>
            </div>
            <div  onClick={()=>{
                props.setConfirmVehiclePanel(true);
                props.setVehicleType('auto')
                props.setVehiclePanel(false)
            }}
             className='flex w-full border-2 rounded-2xl px-2  mb-3 items-center justify-between '>
            <img className='h-15' src="./src/images/car2.png" alt="" />
                <div className=' w-1/2'>
                <h4 className='font-medium'>Auto</h4>
                <h5 className='text-sm '>2 min away  <i className="ri-user-fill">3</i></h5>
                <p className='text-sm text-gray-500'>Affordable ,compact rides </p>
                </div>
                <h2>₹ {props.fair.auto}</h2>
            </div>
            <div  onClick={()=>{
                props.setConfirmVehiclePanel(true);
                props.setVehicleType('motorcycle')
                props.setVehiclePanel(false)
            }}
             className='flex w-full border-2 rounded-2xl px-2 mb-3  items-center justify-between '>
            <img className='h-15' src="./src/images/car2.png" alt="" />
                <div className=' w-1/2'>
                <h4 className='font-medium'>Bike</h4>
                <h5 className='text-sm '>2 min away  <i className="ri-user-fill">1</i></h5>
                <p className='text-sm text-gray-500'>Affordable ,compact rides </p>
                </div>
                <h2>₹ {props.fair.motorcycle}</h2>
            </div>
        </div>

    </div>
  )
}

export default VehiclePanel