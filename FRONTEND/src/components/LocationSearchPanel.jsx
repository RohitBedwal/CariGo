import React from 'react'
import UserHome from '../pages/UserHome'

const LocationSearchPanel = (props) => {
    const arr = ["A-72, Street-7 , West Vinod Nagar ,New Delhi",
    "C-324,Police Colony , Hauz Khas ,New Delhi",
    "B-43, Police Colony,Bhajanpura ,New Delhi",
    "H-15, Police Colony , Malviya Nagar"
    ]
    
  return (
    <div className='sm:flex sm:justify-center sm:w-full  sm:bg-[#cbd5e1]'>
      <div className='fixed sm:w-[400px] sm:bg-white '>
       {arr.map(function(elem,idx){
        return(
            <div key={idx} onClick={()=>{
                props.setVehiclePanel(true)
                props.setOpen(false)
            }} className='flex  m-5 gap-x-3 border-1   border-gray-200 active:border-black rounded-xl p-2 justify-start items-center'>
            <h3 className='bg-[#eee] w-8 text-xl flex item-center rounded-full justify-center'><i className="ri-map-pin-fill"></i></h3>
            <h3 className='font-medium'>{elem}</h3>
        </div>
        )
    })}
        
    </div>
    </div>

    
  )
}

export default LocationSearchPanel