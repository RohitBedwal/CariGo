import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { captainContextData } from '../../context/CaptainContext';
import axios from 'axios';


const  CaptainProtectedWrapper = ({children}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    const {captain, setCaptain} = useContext(captainContextData);
    const [isloading, setIsloading] = useState(true);
    useEffect(()=>{
        if(!token){
            navigate('/captain-login')
        }
       
    },[token])
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
        
    }).then((response)=>{
       
        if(response.status==200){
            console.log(response)
            setCaptain(response.data.captain);
            setIsloading(false)
        }
        console.log(captain)
    })
    .catch(err=>{
        console.log(err)
        localStorage.removeItem('token');
        navigate('/captain-login')
    })
    if(isloading){
        
        return (
            <>
            <div>
                isloading......
            </div>
            </>
        )
    }
  return (
    <div>{children}</div>
  )
}

export default CaptainProtectedWrapper