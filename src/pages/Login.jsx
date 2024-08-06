import React from 'react';
import '../components/login/login.css';
import DesktopMode from '../components/login/DesktopMode';
import MobileMode from '../components/login/MobileMode';
import { Helmet } from 'react-helmet';

function Login() {
  return (
    <div className='container'>
      <Helmet>
        <title>Login UniFurniture</title>
      </Helmet>
        <DesktopMode/>
        <MobileMode/>
    </div>
  )
}

export default Login