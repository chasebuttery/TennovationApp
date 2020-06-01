import React from 'react'
import { Route } from 'react-router-dom'
import AuthRoute from './AuthRoute'
import HomePage from './Home/HomePage'
import PlayPage from './Play/PlayPage'
import ProfilePage from './Profile/ProfilePage'
import JoinPage from './Join/JoinPage'
import PortfolioPage from './Portfolio/PortfolioPage'
import CreatePage from './Create/CreatePage'
import ActivtyPage from './Components/ActivityPage'

export default function Routes () {
  return (
    <div className='routes'>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/play' component={PlayPage} />
      <Route path='/play/:activityid' component={ActivtyPage} />
      <Route exact path='/profile' component={ProfilePage} />
      <Route exact path='/join' component={JoinPage} />
      <Route exact path='/portfolio' component={PortfolioPage} />
      <AuthRoute exact path='/create' component={CreatePage} />
    </div>
  )
}
