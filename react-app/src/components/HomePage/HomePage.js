import { Route, Switch } from "react-router-dom";
import AllPosts from "../PostsComponents/AllPosts";
import UserProfile from "../UserProfile";
import NavBar from "../NavBar";
import "./HomePage.css";
import FollowingPosts from "../FollowComponents/FollowingPosts";
import DirectMessagingPage from "../DirectMessagingComponents/DirectMessagingPage";
import ProfileSettings from "../ProfileSettings";

const HomePage = () => {
  return (
    <div className="home-page">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <FollowingPosts />
        </Route>
        <Route path="/accounts">
          <ProfileSettings />
        </Route>
        <Route path="/explore">
          <AllPosts />
        </Route>
        <Route path="/direct">
          <DirectMessagingPage />
        </Route>
        <Route exact path="/:username">
          <UserProfile />
        </Route>
      </Switch>
    </div>
  );
};

export default HomePage;
