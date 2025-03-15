import React, { createContext, useState } from 'react'

export const captainContextData = createContext();


const CaptainContext = ({children}) => {
        const [captain,setCaptain]= useState({
            fullname:{
                firstName:'',
                lastName:''
            },
            email:'',
            password:'',
            vehicle:{
                color:'',
                plate:'',
                capacity:'',
                vehicleType:''
            }
        })
  return (
    <div>
        <captainContextData.Provider value={{captain,setCaptain}} >
            {children}
        </captainContextData.Provider>
    </div>
  )
}

export default CaptainContext