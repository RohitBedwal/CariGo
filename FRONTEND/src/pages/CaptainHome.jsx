import React, { useEffect, useRef, useState } from 'react'
import DriverDetails from '../components/DriverDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRide from '../components/ConfirmRide';
import axios from 'axios';
import MapView from '../components/MapView';
import { useNavigate } from 'react-router-dom';


const CaptainHome = () => {
  const [ignorePopUpPanel,setIgnorePopUpPanel] = useState(false);
  const[acceptPopUpPanel,setAcceptPopUpPanel] = useState(false)
  const popUpPanelRef = useRef(null);
  const [confirmRide,setConfirmRide] = useState(false);
  const [pendingRide, setPendingRide] = useState(null);
  const [currentRide, setCurrentRide] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const acceptPendingRide = async () => {
    if (!pendingRide?._id) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/accept`, {
        rideId: pendingRide._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) {
        setAcceptPopUpPanel(true);
        setConfirmRide(true);
        setPendingRide(null);
        setCurrentRide(res.data);
      }
    } catch (err) {
      // Could show a toast; for now just log
      console.error('Failed to accept ride', err);
    }
  };
  const startRideWithOtp = async (otp) => {
    if (!currentRide?._id) return false;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/start`, {
        rideId: currentRide._id,
        otp
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) {
        setConfirmRide(false);
        return true;
      }
    } catch (err) {
      console.error('Failed to start ride', err);
    }
    return false;
  };

  // Poll backend for pending rides for this captain
  useEffect(() => {
    if (!token) return;
    // On mount, if there is already an active ride (accepted/ongoing), go to riding view
    (async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/active-captain`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200 && res.data) {
          setCurrentRide(res.data);
          navigate('/captain-riding');
        }
      } catch {}
    })();
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/pending`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200 && res.data) {
          setPendingRide(res.data);
          setIgnorePopUpPanel(false);
          setAcceptPopUpPanel(false);
        }
      } catch (err) {
        // 204 means no pending rides; ignore other transient errors
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [token]);

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
    <div className='h-screen w-full absolute z-0'>
      <MapView pickup={currentRide?.pickup} destination={currentRide?.destination} />
      <div className=' fixed bottom-0 w-full bg-white'>
        <DriverDetails/>
      </div>

      {pendingRide && (
        <div className='flex items-center justify-center '>
          <div ref={popUpPanelRef}  className='fixed shadow-2xl shadow-black bottom-10 rounded-xl w-[90%]  z-30 bg-white '>
            <RidePopUp ride={pendingRide} onAccept={acceptPendingRide} setIgnorePopUpPanel={setIgnorePopUpPanel} setAcceptPopUpPanel={setAcceptPopUpPanel} setConfirmRide={setConfirmRide}   />
          </div>
        </div>
      )}
      <div ref ={confirmRideRef} className='fixed shadow-2xl bottom-0 translate-y-full shadow-black  rounded-xl w-full  z-30 bg-white '>
           <ConfirmRide onStart={startRideWithOtp} setIgnorePopUpPanel={setIgnorePopUpPanel} setConfirmRide={setConfirmRide}   />
           
        </div>
      
      
    </div>
  )
}

export default CaptainHome