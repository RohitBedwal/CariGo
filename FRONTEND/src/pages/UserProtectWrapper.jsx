import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserProtectWrapper = ({children}) => {
    const token =localStorage.getItem('token');
    const navigate = useNavigate();
    const {user, setUser } = useContext(userDataContext);
    const [isloading , setIsloading ] = useState(true);

    useEffect(()=>{
        if(!token) {
            navigate('/login')
            
        }
    },[token])
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status==200){
            console.log(response.data.user)
            setUser(response.data.user);
            setIsloading(false)
        }
    })
    .catch(err=>{
        console.log(err)
        localStorage.removeItem('token');
        navigate('/login')
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
        <>
    {children}
    </>
  )
}

export default UserProtectWrapper