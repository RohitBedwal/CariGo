import React from 'react'

const RidePopUp = (props) => {
  const { ride } = props;
  const amount = ride?.fare ?? 0;
  const km = ride?.distance ? `${(ride.distance/1000).toFixed(1)} km` : '—';
  return (
    <div className=''>
         <div className='  flex items-center justify-between border-b-2 p-4 border-gray-300 '>
          <div className='flex items-center gap-x-4'>
            <img className='h-16 rounded-full' src="./src/images/man2.png" alt="" />
            <h2 className='font-semibold text-lg'>Abhay Kumar</h2>
          </div>
          <div className='flex flex-col  text-end'>
            <h5 className='text-xl font-bold '>₹{amount}</h5>
            <p className='text-sm text-gray-500'>{km}</p>
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

          <div className='flex items-center justify-center w-full'>
        <button onClick={()=>{
            props.setIgnorePopUpPanel(true)
           
        }} className=' rounded-lg bg-gray-300 text-white font-semibold text-lg p-1.5 m-2 w-full'>Ignore</button>
        <button onClick={()=>{
            if (typeof props.onAccept === 'function') {
              props.onAccept();
            } else {
              props.setConfirmRide(true)
              props.setAcceptPopUpPanel(true)
            }
        }} className=' rounded-lg bg-yellow-300 text-white font-semibold text-lg p-1.5 m-2 w-full'>Accept</button>
      </div>
       

    </div>
  )
}

export default RidePopUp