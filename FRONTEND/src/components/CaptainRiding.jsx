import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FinishRide from './FinishRide';
import MapView from './MapView';
import axios from 'axios';

const CaptainRiding = () => {
    const [finishRide, setFinishRide] = useState(false);
    const [activeRide, setActiveRide] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const token = localStorage.getItem('token');
    const finishRideRef = useRef(null);
    const navigate = useNavigate();
    useGSAP(() => {
        if (finishRide) {
            gsap.to(finishRideRef.current, {
                transform:"translateY(0%)",
            })
        }
        else {

            gsap.to(finishRideRef.current, {
                transform:"translateY(100%)",
               
            })
        }
    }, [finishRide])

    // Poll captain's active ride to display details
    useEffect(() => {
        if (!token) return;
        // Immediate fetch on mount
        (async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/active-captain`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.status === 200) setActiveRide(res.data);
            } catch {}
        })();
        // Poll for updates
        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/active-captain`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.status === 200) {
                    setActiveRide(res.data);
                } else if (res.status === 204) {
                    // No active ride
                    setActiveRide(null);
                    setFinishRide(false);
                    navigate('/captainHome');
                }
            } catch (err) {
                // If no active ride, navigate back to captain home
                setActiveRide(null);
                setFinishRide(false);
                navigate('/captainHome');
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [token]);

    const onFinishRide = async () => {
        setErrorMsg('');
        if (!activeRide?._id) return;
        if (activeRide?.status !== 'ongoing') {
            setErrorMsg('Start the ride with the OTP before finishing.');
            return;
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/finish`, {
                rideId: activeRide._id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                setFinishRide(false);
                setErrorMsg('');
            }
        } catch (err) {
            const apiMsg = err?.response?.data?.message || 'Failed to finish ride';
            setErrorMsg(apiMsg);
            console.error('Failed to finish ride', err);
        }
    };
    return (
        <div>

            <div className='h-screen w-full absolute z-0'>
                <MapView pickup={activeRide?.pickup} destination={activeRide?.destination} />
                <div  onClick={() => { setFinishRide(true) }} className={`fixed bottom-0 w-full h-[15%] bg-orange-300 text-center ${finishRide ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                    <i className="ri-arrow-up-wide-line text-2xl text-gray-500 "></i>
                    <div className='flex   justify-between items-center '>
                        <h3 className='text-xl w-1/2 font-semibold text-center m-2'>{activeRide?.distance ? `${(activeRide.distance/1000).toFixed(1)} KM away` : '—'}</h3>
                        <button disabled={activeRide?.status !== 'ongoing'} className={`bg-blue-400 text-white font-semibold m-2 p-3 w-1/2 rounded-lg ${activeRide?.status !== 'ongoing' ? 'opacity-50 cursor-not-allowed' : ''}`}>Finish Ride</button>
                    </div>
                </div>
                <div ref={finishRideRef} className='fixed shadow-2xl shadow-black bottom-0 translate-y-full rounded-xl w-full z-30 bg-white pointer-events-auto'>
                    <FinishRide ride={activeRide} onFinish={onFinishRide} setFinishRide={setFinishRide} errorMsg={errorMsg} />
                </div>
            </div>
        </div>
    )
}

export default CaptainRiding