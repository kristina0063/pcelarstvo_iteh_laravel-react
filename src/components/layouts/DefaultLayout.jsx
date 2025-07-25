
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/Context';

export default function DefaultLayout() {
  const {token} = useStateContext();
  console.log(token);
  return token ? <Outlet /> : <Navigate to="/login" replace/>;
}
