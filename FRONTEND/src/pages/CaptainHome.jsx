import React, { use, useRef, useState } from 'react'
import DriverDetails from '../components/DriverDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRide from '../components/ConfirmRide';


const CaptainHome = () => {
  const [ignorePopUpPanel,setIgnorePopUpPanel] = useState(false);
  const[acceptPopUpPanel,setAcceptPopUpPanel] = useState(false)
  const popUpPanelRef = useRef(null);
  const [confirmRide,setConfirmRide] = useState(false);

  const confirmRideRef=useRef(null);
  useGSAP(()=>{
   if(ignorePopUpPanel){
    gsap.to(popUpPanelRef.current,{
      opacity:0,
      y:500,
      x:-500,
      rotate:159,
      duration:2
    })
   }
   
  },[ignorePopUpPanel])

  useGSAP(()=>{
    if(acceptPopUpPanel){
     gsap.to(popUpPanelRef.current,{
       opacity:0,
       y:1000,
       duration:.23
       
     })
    }
    
   },[acceptPopUpPanel])


  


  useGSAP(()=>{
    if(confirmRide){
     gsap.to(confirmRideRef.current,{
      
       transform:"translateY(0%)"
       
     })
    }
    else{
      gsap.to(confirmRideRef.current,{
        transform:"translateY(100%)"
      })
    }
   },[confirmRide])

   console.log(confirmRide)

  return (
    <div className='h-screen w-full  absolute '>
      <img className='h-full w-full objwct cover' src="./src/images/map.png" alt="" />
      <div className=' fixed bottom-0 w-full bg-white'>
        <DriverDetails/>
      </div>

      <div className='flex items-center justify-center '>
      <div ref={popUpPanelRef}  className='fixed shadow-2xl shadow-black bottom-10 rounded-xl w-[90%]  z-30 bg-white '>
           <RidePopUp setIgnorePopUpPanel={setIgnorePopUpPanel} setAcceptPopUpPanel={setAcceptPopUpPanel} setConfirmRide={setConfirmRide}   />
           
      </div>
        </div>
      <div ref ={confirmRideRef} className='fixed shadow-2xl bottom-0 translate-y-full shadow-black  rounded-xl w-full  z-30 bg-white '>
           <ConfirmRide setIgnorePopUpPanel={setIgnorePopUpPanel} setConfirmRide={setConfirmRide}   />
           
        </div>
      
      
    </div>
  )
}

export default CaptainHome