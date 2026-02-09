import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import MapView from '../components/MapView';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmVehiclePanel from '../components/ConfirmVehiclePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/waitingForDriver';
import PaymentPage from '../components/PaymentPage';
import axios from 'axios';

const UserHome = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null);
    const closePanelRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const vehiclePanelRef = useRef(null);
    const ConfirmVehiclePanelRef = useRef(null);
    const [confirmVehiclePanel, setConfirmVehiclePanel] = useState(false);
    const [LookingVehiclePanel, setLookingVehiclePanel] = useState(false);
    const lookingVehiclePanelRef = useRef(null);
    const [waitingForDriverPanel, setWatingForDriverPanel] = useState(false);
    const waitingForDriverRef = useRef(null);
    const [activeRide, setActiveRide] = useState(null);
    const [paymentPanel, setPaymentPanel] = useState(false);
    const paymentPanelRef = useRef(null);

    const [pickupLocation, setPickupLocation] = useState([]);
    const [destinationLocation, setDestinationLocation] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fair, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState(null);

    // Panel Animations
    useGSAP(() => {
        gsap.to(panelRef.current, {
            height: open ? '70%' : '0%',
            duration: 0.45,
        });
        gsap.to(closePanelRef.current, {
            opacity: open ? 1 : 0,
            duration: 0.45,
        });
    }, [open]);

    useGSAP(() => {
        gsap.to(vehiclePanelRef.current, {
            transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)'
        });
    }, [vehiclePanel]);

    useGSAP(() => {
        gsap.to(ConfirmVehiclePanelRef.current, {
            transform: confirmVehiclePanel ? 'translateY(0%)' : 'translateY(100%)'
        });
    }, [confirmVehiclePanel]);

    useGSAP(() => {
        gsap.to(lookingVehiclePanelRef.current, {
            transform: LookingVehiclePanel ? 'translateY(0%)' : 'translateY(100%)'
        });
    }, [LookingVehiclePanel]);

    useGSAP(() => {
        gsap.to(waitingForDriverRef.current, {
            transform: waitingForDriverPanel ? 'translateY(0%)' : 'translateY(100%)'
        });
    }, [waitingForDriverPanel]);

    useGSAP(() => {
        gsap.to(paymentPanelRef.current, {
            transform: paymentPanel ? 'translateY(0%)' : 'translateY(100%)'
        });
    }, [paymentPanel]);

    // API Call for Pickup
    async function getPickupLocation(e) {
        const val = e.target.value;
        setPickup(val);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: val },
                headers: { Authorization: `Bearer ${token}` },
            });
            setPickupLocation(res.data);
        } catch (err) {
            console.error('Error fetching pickup suggestions:', err);
        }
    }

    // API Call for Destination
    async function getDestinationLocation(e) {
        const val = e.target.value;
        setDestination(val);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: val },
                headers: { Authorization: `Bearer ${token}` },
            });
            setDestinationLocation(res.data);
        } catch (err) {
            console.error('Error fetching destination suggestions:', err);
        }
    }

    // API Call for Fare when vehiclePanel opens
    useEffect(() => {
        const findTrip = async () => {
            if (vehiclePanel) {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
                        params: { pickup, destination },
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setFare(res.data);
                } catch (err) {
                    console.error('Error fetching fare:', err);
                }
            }
        };
        findTrip();
    }, [vehiclePanel, pickup, destination]);

    async function createRide(){
        try{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`,{
                pickup,
                destination,
                vehicleType
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}

            })
            // On success, show the "Looking for Driver" panel
            setLookingVehiclePanel(true);
            setConfirmVehiclePanel(false);
            // Begin polling for active ride
            setWatingForDriverPanel(false);
        }catch(err){
            console.error('Error creating ride:', err);
        }
    }

    // Poll for active ride; when accepted, show waiting panel with OTP
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/active`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.status === 200) {
                    const ride = res.data;
                    setActiveRide(ride);
                    if (ride.status === 'accepted') {
                        setLookingVehiclePanel(false);
                        setWatingForDriverPanel(true);
                        setPaymentPanel(false);
                    }
                    if (ride.status === 'ongoing') {
                        setLookingVehiclePanel(false);
                        setWatingForDriverPanel(true);
                        setPaymentPanel(false);
                    }
                    if (ride.status === 'completed') {
                        setLookingVehiclePanel(false);
                        setWatingForDriverPanel(false);
                        setPaymentPanel(true);
                    }
                }
            } catch (err) {
                // 204 no content or transient errors; ignore
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    // Submit handler
    function submitHandler(e) {
        e.preventDefault();
        // Possibly trigger state update or other logic
    }
    return (
        <div className='sm:flex sm:w-full sm:justify-center sm:bg-slate-300 bg-white'>
            <div className='relative sm:w-[400px] sm:bg-white'>
                <div className='h-screen w-full absolute z-0'>
                    <MapView pickup={pickup} destination={destination} />
                </div>
                <div className='flex flex-col absolute justify-end w-full h-screen pointer-events-none'>
                    <div className='relative bg-white w-full p-5 h-[30%] pointer-events-auto'>
                        <h4 className='font-semibold text-2xl pb-3'>Find a trip</h4>
                        <h5 onClick={() => setOpen(false)} ref={closePanelRef} className='absolute opacity-0 right-8 text-2xl top-5'>
                            <i className="ri-arrow-down-wide-fill"></i>
                        </h5>
                        <form onSubmit={submitHandler} className='flex flex-col gap-y-5'>
                            <input onClick={() => { setOpen(true); setActiveField('pickup'); }}
                                value={pickup}
                                onChange={getPickupLocation}
                                className='bg-gray-200 p-2 rounded-md text-center'
                                type="text"
                                placeholder='Add a pickup location' />
                            <input onClick={() => { setOpen(true); setActiveField('destination'); }}
                                value={destination}
                                onChange={getDestinationLocation}
                                className='bg-gray-200 p-2 rounded-md text-center'
                                type="text"
                                placeholder='Enter your destination' />
                        </form>
                    </div>

                    <div ref={panelRef} className='w-full bg-white pointer-events-auto'>
                        <LocationSearchPanel
                            suggestions={activeField === 'pickup' ? pickupLocation : destinationLocation}
                            setOpen={setOpen}
                            setDestination={setDestination}
                            setPickup={setPickup}
                            vehiclePanel={vehiclePanel}
                            activeField={activeField}
                            setVehiclePanel={setVehiclePanel}
                        />
                    </div>

                    <div ref={vehiclePanelRef} className='fixed translate-y-full bottom-0 w-full z-10 bg-white sm:p-0 p-5 pointer-events-auto'>
                        <VehiclePanel setVehicleType={setVehicleType} destination={destination} pickup={pickup} fair={fair} setVehiclePanel={setVehiclePanel} setConfirmVehiclePanel={setConfirmVehiclePanel} />
                    </div>

                    <div ref={ConfirmVehiclePanelRef} className='fixed translate-y-full bottom-0 w-full z-30 bg-white pointer-events-auto'>
                        <ConfirmVehiclePanel onConfirm={createRide} vehicleType={vehicleType} destination={destination} pickup={pickup} fair={fair} setConfirmVehiclePanel={setConfirmVehiclePanel} setLookingVehiclePanel={setLookingVehiclePanel} />
                    </div>

                    <div ref={lookingVehiclePanelRef} className='fixed bottom-0 translate-y-full w-full z-30 bg-white pointer-events-auto'>
                        <LookingForDriver vehicleType={vehicleType} destination={destination} pickup={pickup} fair={fair} setLookingVehiclePanel={setLookingVehiclePanel} />
                    </div>

                    <div ref={waitingForDriverRef} className='fixed translate-y-full bottom-0 w-full z-30 bg-white pointer-events-auto'>
                        <WaitingForDriver ride={activeRide} />
                    </div>

                    <div ref={paymentPanelRef} className='fixed translate-y-full bottom-0 w-full z-30 bg-white pointer-events-auto'>
                        <PaymentPage ride={activeRide} onPay={async ()=>{
                            try{
                                const token = localStorage.getItem('token');
                                await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/pay`,{ rideId: activeRide?._id },{ headers: { Authorization: `Bearer ${token}` } });
                                // Close payment panel
                                setPaymentPanel(false);
                                setActiveRide(null);
                                // Reload and go to user home page
                                window.location.href = '/userHome';
                            }catch(err){
                                // Could show a toast; keep simple for now
                                console.error('Payment failed', err);
                            }
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;