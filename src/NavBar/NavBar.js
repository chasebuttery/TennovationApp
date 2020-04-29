import React from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.scss'
import Logo from '../Images/tvthick.png'
import NavMenu from '../Images/Menu.jpeg'
import Play from '../Images/Play.jpeg'
//import Schedule from "../Images/Schedule.jpeg";
import Portfolio from '../Images/Portfolio.jpeg'
import Auth from '../Auth'

export default function NavBar () {
  const [isExpanded, setIsExpanded] = useState(true)
  const [profileIcon, setProfileIcon] = useState()

  useEffect(() => {
    async function getProfileImg () {
      const profileImg = await Auth.getProfileImg()
      setProfileIcon(profileImg)
    }
    getProfileImg()
  }, [profileIcon])

  function expandNavbar () {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='NavBar'>
      <div className='Expander'>
        <button onClick={expandNavbar} className='ExpandButton'>
          <img className='ExpandIcon' src={NavMenu} />
        </button>
      </div>
      <div className='MainNav'>
        <div className='LogoLink'>
          <NavLink to='/'>
            <img className='Icon' src={Logo} />
          </NavLink>
        </div>
        <div className='ProfileLink'>
          <NavLink activeClassName='active' to='/profile'>
            <img className='ProfileIcon' src={profileIcon} />
            <h1 className='Text'> PROFILE </h1>
          </NavLink>
        </div>
      </div>
      <div
        className={isExpanded ? 'SecNav' : 'MobileNav'}
        onClick={expandNavbar}
      >
        <div>
          <NavLink className='PlayLink' activeClassName='active' to='/play'>
            <img className='Icon' src={Play} />
            <h1 className='Text'> PLAY </h1>
          </NavLink>
        </div>
        <div className='EventsLink'>
          <NavLink activeClassName='active' to='/events'>
            <img className='Icon' src={Portfolio} />
            <h1 className='Text'>EVENTS</h1>
          </NavLink>
        </div>
        <div className='PortfolioLink'>
          <NavLink activeClassName='active' to='/portfolio'>
            <img className='Icon' src={Portfolio} />
            <h1 className='Text'> ACTIVITY PORTFOLIO</h1>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
