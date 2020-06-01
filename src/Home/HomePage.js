import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './HomePage.scss'
import TennisEvent from '../Images/KTCQuail.jpeg'
import CreateIcon from '../Images/createicon.png'
import firebase from '../firebase';
import ActivitiesInfo from './Components/ActivitiesInfo'
import CreatorsInfo from './Components/CreatorsInfo'

export default function HomePage () {
  const history = useHistory()

  function goToCreatePage () {
    history.push('/create')
  }
  function goToJoinPage () {
    history.push('/join')
  }


  return (
    <div className='HomePage'>
      <h1>Tennovation</h1>
      <h3>Learn, Play, Create Together</h3>

      <div className='Image'>
        <img src={TennisEvent} />
      </div>

      <ActivitiesInfo />

      <CreatorsInfo />


      <div className = "ActivityMembership">
      <h2>Locations, Events</h2>
      </div>

      <div className='CreateActivityButton' onClick={goToCreatePage} >
        <h2>CREATE</h2>
      </div>
      <div className='CreateActivityButton' onClick={goToJoinPage} >
        <h2>JOIN </h2>
      </div>

    </div>
  )
}
