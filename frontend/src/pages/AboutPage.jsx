import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../auth/tokenStorage'
import axiosInstance from '../api/axiosInstance'

const AboutPage = () => {
    const access=getAccessToken()
    const [userProfile,setUserprofile]=useState(null)
    useEffect(()=>{
        const fetchProfile=async()=>{
            const res=await axiosInstance.get('api/auth/profile/')
            console.log(res);
            setUserprofile(res.data)
            
        }
        fetchProfile()
    },[])
  return (
    <div>
      Here is about Page
      <p>{access}</p>
      <p>{userProfile?userProfile.email:'no user'}</p>
    </div>
  )
}

export default AboutPage
