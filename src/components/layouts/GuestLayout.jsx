import React from 'react'
import { useStateContext } from '../../context/Context'
import { Navigate, Outlet } from 'react-router-dom';

export default function GuestLayout () {
    const {token} = useStateContext();
    console.log(token);
    return !token ? <Outlet/>: <Navigate to="/aktivnosti" replace/>;
}
