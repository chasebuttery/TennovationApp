import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './HomePage.scss'
import TennisEvent from '../Images/KTCQuail.jpeg'
import CreateIcon from '../Images/AddCircle.svg'

export default function HomePage () {
  const history = useHistory()

  function goToCreatePage () {
    history.push('/create')
  }

  return (
    <div className='HomePage'>
      <h1>Tennovation</h1>
      <h3>Learn, Play, Create Together</h3>
      <div className='CreateActivityButton'>
        <img src={CreateIcon} onClick={goToCreatePage} />
      </div>
      <div className='Image'>
        <img src={TennisEvent} />
      </div>
    </div>
  )
}
