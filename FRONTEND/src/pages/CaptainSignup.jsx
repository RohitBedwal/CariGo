import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { captainContextData } from '../../context/CaptainContext';
import axios from 'axios';




const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [color, setColor] = useState('');
  const [vehicletype, setVehicletype] = useState('');

  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(captainContextData);

  async function submitHandler(e) {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicletype
      }
    }
  
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptain);
    if (response.status == 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captainHome')
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setPlate('');
    setCapacity('');
    setColor('');
    setVehicletype('');

  }
  return (

    <div className='sm:flex sm:w-full sm:justify-center sm:bg-slate-300 bg-white'>
      <div className='h-screen w-full flex flex-col justify-between sm:w-[400px] sm:bg-white'>
      <div >
        <div className='h-15 w-full flex mb-4 bg-white text-black'>
          <h3 className='text-4xl ml-7 '>Uber <i className="ri-arrow-right-line items-end "></i> </h3>
        </div>


        <form onSubmit={(e) => submitHandler(e)} className='mt-4 mx-5 flex flex-col gap-y-3'>
          <h3 className='font-semibold'> What's your Name  :</h3>
          <div className='flex gap-x-4  '>
            <input value={firstname} onChange={(e) => setFirstname(e.target.value)} className=' p-3 w-1/2 rounded bg-gray-300' required type="text" placeholder='first name' />
            <input value={lastname} onChange={(e) => setLastname(e.target.value)} className=' p-3 w-1/2 rounded bg-gray-300' type="text" placeholder='last name' />

          </div>
          <h3 className='font-semibold'> What's your Email  :</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className=' p-3 rounded bg-gray-300' required type="email" placeholder='Email address' />
          <h3 className='font-semibold'> Your Password :</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className=' p-3 rounded bg-gray-300' required type="password" placeholder='Password' />


          <h3 className='font-semibold'> Vehicles Details :</h3>
          <div className='flex flex-col  gap-y-4'>
            <div className='flex gap-x-4  '>
              <input value={color} onChange={(e) => setColor(e.target.value)} className=' p-3 w-1/2 rounded bg-gray-300' required type="text" placeholder='color' />
              <input value={plate} onChange={(e) => setPlate(e.target.value)} className=' p-3 w-1/2 rounded bg-gray-300' type="text" placeholder='plate' />

            </div>
            <div className='flex gap-x-4  '>
              <input value={capacity} onChange={(e) => setCapacity(e.target.value)} className=' p-3 w-1/2 rounded bg-gray-300' required type="nummber" placeholder='capacity' />
              <select value={vehicletype} required name='' onChange={(e) => setVehicletype(e.target.value)} className=' p-3 w-1/2 rounded bg-gray-300' type="text" placeholder='plate'>
                <option value="" disabled>Vehicle Type</option>
                <option value="car">car</option>
                <option value="auto">auto</option>
                <option value="motorcycle">motorcycle</option>

              </select>
            </div>

          </div>
          <button className='text-center text-white bg-black  rounded-lg py-3 '>Create Account</button>
          <h3 className='text-center'>Already  a Captain? <Link className='text-[#066dfe]' to="/captain-login">Sign in </Link></h3>


        </form>
      </div>
      <div className='mt-4 mx-5 flex flex-col gap-y-4'>
        <p className='text-sm leading-4 text-center mb-5'>
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>


    </div>
    </div>
  )
}

export default CaptainSignup