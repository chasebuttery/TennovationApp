import React from "react";
import { Route } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import HomePage from "./Pages/Home/HomePage";
import PlayPage from "./Pages/Play/PlayPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import AboutPage from "./Pages/About/AboutPage";
import PortfolioPage from "./Pages/Portfolio/PortfolioPage";
import CreatePage from "./Pages/Create/CreatePage";
import MembersPage from "./Pages/Members/Members";
import ActivityPage from "./Components/Activity/ActivityPage";

export default function Routes() {
  return (
    <div className="routes">
      <Route exact path="/" component={PlayPage} />
      <Route exact path="/explore" component={PlayPage} />
      <Route path="/explore/activity/:activityid" component={ActivityPage} />
      <Route path="/explore/filter/:filterString" component={PlayPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/partners" component={AboutPage} />

      <Route exact path="/members" component={MembersPage} />
      <Route exact path="/portfolio" component={PortfolioPage} />
      <AuthRoute exact path="/create" component={CreatePage} />
    </div>
  );
}
