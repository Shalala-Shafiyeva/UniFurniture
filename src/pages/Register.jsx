import React from 'react';
import '../components/register/register.css';
import DesktopMode from '../components/register/DesktopMode';
import MobileMode from '../components/register/MobileMode';
import { Helmet } from 'react-helmet';

function Register() {
  return (
    <div className='container'>
      <Helmet>
      <title>Register UniFurniture</title>
      </Helmet>
        <DesktopMode/>
        <MobileMode/>
    </div>
  )
}

export default Register;