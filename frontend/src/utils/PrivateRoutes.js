import React from 'react';
import { Navigate, Route } from "react-router-dom";

const PrivateRoutes = ({ component: Component }) => {
  const auth = JSON.parse(localStorage.getItem("token")) ?? false; 

  if(auth) {
      return <Component />;
  } else {
      return <Navigate replace to="/login"/>
  }
};

export default PrivateRoutes;