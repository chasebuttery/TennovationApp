import React from 'react'
import './App.scss'
import Routes from './Routes'
import NavBar from './NavBar/NavBar'

export default function App () {
  return (
    <div className='App'>
      <div className='Nav'>
        <NavBar />
      </div>
      <div className='PageContent'>
        <Routes />
      </div>
    </div>
  )
}
