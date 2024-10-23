import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import appContext from '../utils/appContext';

const ProtectedRoute = () => {
    const {userInfo,setUserInfo}=useContext(appContext);
    const [isLoading,setIsLoading]=useState(true);

    const navigate=useNavigate();

    const getUserInfo=async()=>{
        try {
            setIsLoading(true)
            const res=await axios.get('http://localhost:8080/api/user/profile',{withCredentials:true});
            if(res){
                setUserInfo(res);
                setIsLoading(false)
            }else{
                setIsLoading(false)
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    useEffect(()=>{
       getUserInfo();
    },[])

if(isLoading){
    return <p>Loading...</p>
}
return userInfo ? <Outlet /> : <Navigate to='/login'/>
}

export default ProtectedRoute