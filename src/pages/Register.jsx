import React from 'react';
import '../components/register/register.css';
import DesktopMode from '../components/register/DesktopMode';
import MobileMode from '../components/register/MobileMode';

function Register() {
  return (
    <div className='container'>
        <DesktopMode/>
        <MobileMode/>
    </div>
  )
}

export default Register;