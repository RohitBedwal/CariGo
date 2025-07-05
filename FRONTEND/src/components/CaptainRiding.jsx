import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import FinishRide from './FinishRide';

const CaptainRiding = () => {
    const [finishRide, setFinishRide] = useState(false);
    const finishRideRef = useRef(null);
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
    return (
        <div>

            <div className='h-screen w-full  absolute '>
                <img className='h-full w-full objwct cover' src="./src/images/map.png" alt="" />
                <div  onClick={() => { setFinishRide(true) }} className='fixed bottom-0  w-full h-[15%]  bg-orange-300 text-center '>
                    <i className="ri-arrow-up-wide-line text-2xl text-gray-500 "></i>
                    <div className='flex   justify-between items-center '>
                        <h3 className='text-xl w-1/2 font-semibold text-center m-2'>4 KM away</h3>
                        <button className='bg-blue-400 text-white font-semibold m-2 p-3 w-1/2 rounded-lg'>Finish Ride</button>
                    </div>
                </div>
                <div ref={finishRideRef} className='fixed shadow-2xl shadow-black bottom-0 translate-y-full rounded-xl w-full z-30 bg-white '>

                    <FinishRide  setFinishRide={setFinishRide} />
                </div>
            </div>
        </div>
    )
}

export default CaptainRiding