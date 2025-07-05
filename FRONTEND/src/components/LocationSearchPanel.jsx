import React, { useEffect, useState } from 'react'

import axios from 'axios'

const LocationSearchPanel = ({setVehiclePanel,suggestions,activeField,setDestination ,setOpen,setPickup}) => {

  

   console.log(suggestions)
   
   const handleClick=(suggestion)=>{
    console.log(activeField)
      if(activeField ==='pickup'){
        console.log(suggestion)
        setPickup(suggestion)
      }
      else if(activeField==='destination'){
        setDestination(suggestion)
        setVehiclePanel(true);
        setOpen(false)
      }
   }
  return ( 
    <div className='sm:flex sm:justify-center sm:w-full  sm:bg-[#cbd5e1]'>
      <div className='fixed sm:w-[400px] sm:bg-white '>
       {suggestions.map((elem,idx)=>{
        
        return(
            <div key={idx} onClick={()=>{  handleClick(elem.description)
            }} className='flex  m-5 gap-x-3 border-1   border-gray-200 active:border-black rounded-xl p-2 justify-start items-center'>
            <h3 className='bg-[#eee] w-8 text-xl flex item-center rounded-full justify-center'><i className="ri-map-pin-fill"></i></h3>
            <h3 className='font-medium'>{elem.description}</h3>
        </div>
        )
    })}
        
    </div>
    </div>

    
  )
}

export default LocationSearchPanel