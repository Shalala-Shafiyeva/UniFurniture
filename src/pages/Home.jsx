import React from 'react'
import Hero from '../components/home/Hero'
import Header from '../components/header/Header'
import '../components/home/home.css';
import NextGenBanking from '../components/home/NextGenBanking';
import Choose from '../components/home/Choose';
import Impact from '../components/home/Impact';
import ManageFinance from '../components/home/ManageFinance';

function Home() {
  return (
    <div className='homeContainer'>
        <Header/>
        <Hero/>
        <NextGenBanking/>
        <Choose/>
        <Impact/>
        <ManageFinance/>
    </div>
  )
}

export default Home