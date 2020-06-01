import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import CreatorIcon from '../../Images/creator.png';
import './CreatorsInfo.scss';

export default function CreatorsInfo() {

  const history = useHistory();

  return (
    <div className='CreatorsInfo' onClick = {e => {history.push('/create')}}>
      
      <h1 className = "InfoTitle"> Creators</h1>
      <p> create activities as a coach, teacher, or member</p>
        <div className="Icons">
          <div className ="Coach">
          <img className='Icon' src={CreatorIcon} />
          Coach
        </div>
        <div className ="Teacher">
      <img className='Icon' src={CreatorIcon} />
       Teacher
      </div>
      <div className ="Member">
      <img className='Icon' src={CreatorIcon} />
      Member
      </div>
      </div>
    </div>
  )
}
