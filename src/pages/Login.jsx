import React from 'react';
import '../components/login/login.css';
import DesktopMode from '../components/login/DesktopMode';
import MobileMode from '../components/login/MobileMode';

function Login() {
  return (
    <div className='container'>
        <DesktopMode/>
        <MobileMode/>
    </div>
  )
}

export default Login