import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmVehiclePanel from '../components/ConfirmVehiclePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/waitingForDriver';
import PaymentPage from '../components/PaymentPage';

const UserHome = () => {
    
    const [pickup,setPickup] = useState('');
    const [destination,setDestination] = useState('');
    const [open , setOpen]= useState(false);
    const panelRef = useRef(null);
    const closePanelRef = useRef(null);
    const [vehiclePanel,setVehiclePanel]=useState(false)
    const vehiclePanelRef = useRef(null);
    const ConfirmVehiclePanelRef = useRef(null);
    const [confirmVehiclePanel,setConfirmVehiclePanel]= useState(false);
    const [LookingVehiclePanel,setLookingVehiclePanel] = useState(false)
    const lookingVehiclePanelRef = useRef(null)
    const [waitingForDriverPanel,setWatingForDriverPanel]= useState(false);
    const waitingForDriverRef = useRef(null);

    
    useGSAP(()=>{
        if(open){
            gsap.to(panelRef.current,{
                height:'70%',
                duration:.45,
            })
            gsap.to(closePanelRef.current,{
               opacity:1,
                duration:.45
            })
            
        }else{
            gsap.to(panelRef.current,{
                height:"0%",
                duration:.45,
                
            })
            gsap.to(closePanelRef.current,{
                opacity:0,
                 duration:.45
             })
        }

    },[open])
    useGSAP(()=>{
        if(vehiclePanel){
            gsap.to(vehiclePanelRef.current,{
                transform:'translateY(0)'
            })
        }
        else{
            gsap.to(vehiclePanelRef.current,{
                transform:'translateY(100%)'
                
            })
        }
    },[vehiclePanel])

    useGSAP(()=>{
        if(confirmVehiclePanel){
            gsap.to(ConfirmVehiclePanelRef.current,{
                transform:"translateY(0%)"
            })
        }
        else{
            gsap.to(ConfirmVehiclePanelRef.current,{
                   transform:"translateY(100%)"
            })
        }
    },[confirmVehiclePanel])

    useGSAP(()=>{
        if(LookingVehiclePanel){
            gsap.to(lookingVehiclePanelRef.current,{
                transform:"translateY(0%)"
            })
        }
        else{
            gsap.to(lookingVehiclePanelRef.current,{
                    transform:"translateY(100%)"
            })
        }
    },[LookingVehiclePanel])

    useGSAP(()=>{
       if(waitingForDriverPanel){
        gsap.to(waitingForDriverRef.current,{
            transform:"translateY(0%)"
        })
        
    }else{
        gsap.to(waitingForDriverRef.current,{
            transform:"translateY(100%)"
        })
    }
    },[waitingForDriverPanel])

    function submitHandler(e){
        e.preventDefault()

    }
  return (
    <div className='sm:flex sm:w-full sm:justify-center sm:bg-slate-300 bg-white  '>
        <div className='relative sm:w-[400px] sm:bg-white'>
        <div  className='h-screen w-full  absolute '>
                <img className='h-full w-full objwct cover' src="./src/images/map.png" alt="" />
        </div>
        <div className='flex flex-col absolute  justify-end w-full h-screen'>
        <div className='relative bg-white w-full p-5  h-[30%] '>
            <h4 className='font-semibold  text-2xl pb-3'>Find a trip</h4>
            <h5 onClick={()=>setOpen(false)} ref={closePanelRef} className='absolute opacity-0 right-8 text-2xl top-5'><i className="ri-arrow-down-wide-fill"></i></h5>
            <form onSubmit={(e)=>{
                submitHandler(e)
            }} className='flex flex-col gap-y-5' >
                <input onClick={()=>{
                    setOpen(true)
                }} value={pickup} onChange={(e)=>setPickup(e.target.value)} className='bg-gray-200 p-2 rounded-md
                 text-center' type="text " placeholder='add a pickup location ' />
                <input onClick={()=>{
                    setOpen(true)
                }} value={destination} onChange={(e)=>setDestination(e.target.value)} className='bg-gray-200 p-2 rounded-md text-center' type="text " placeholder='enter your destination ' />
            </form>
        </div>
        <div ref={panelRef} className='w-full  bg-white'>
                <LocationSearchPanel  setOpen ={setOpen} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel}/>
        </div>
        <div ref={vehiclePanelRef} className='fixed translate-y-full bottom-0 w-full z-10 bg-white sm:p-0 p-5'>
            <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmVehiclePanel={setConfirmVehiclePanel}/>
        </div>
        <div ref={ConfirmVehiclePanelRef} className='fixed translate-y-full bottom-0 w-full z-30 bg-white '>
            <ConfirmVehiclePanel setConfirmVehiclePanel={setConfirmVehiclePanel} setLookingVehiclePanel={setLookingVehiclePanel} />
        </div>
        <div ref={lookingVehiclePanelRef} className='fixed bottom-0 translate-y-full w-full z-30 bg-white '>
           <LookingForDriver setLookingVehiclePanel ={setLookingVehiclePanel}/>
        </div>

        <div ref={waitingForDriverRef}  className='fixed  translate-y-full bottom-0 w-full z-30 bg-white '>
           <WaitingForDriver/>
        </div>
        <div  className='fixed translate-y-full  bottom-0 w-full z-30 bg-white '>
           <PaymentPage/>
        </div>


        </div>
    </div>
    </div>
  )
}

export default UserHome