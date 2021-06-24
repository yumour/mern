import "./App.css";
import { Fragment, useEffect } from "react";
import Navbar from "./component/Layout/Navbar";
import Landing from "./component/Layout/Landing";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Alert from "./component/Layout/Alert";
import Dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./component/routing/PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import CreateProfile from "./component/profile-form/CreateProfile";
import EditProfile from "./component/profile-form/EditProfile";
import AddExperience from "./component/profile-form/AddExperience";
import NotFound from "./component/Layout/NotFound";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loaduser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import AddEducation from "./component/profile-form/AddEducation";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import Post from "./component/post/Post";
import Posts from "./component/post/Posts";
import CreatePost from "./component/post/CreatePost";
import EditPost from "./component/post/EditPost";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const NotLanding = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profiles" component={Profiles} />
        <Redirect from="/profile/post/:id" to="/post/:id" />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/posts" component={Posts} />
        <Redirect from="/edit-post/post/:id" to="/post/:id" />
        <PrivateRoute exact path="/post/:id" component={Post} />
        <PrivateRoute exact path="/create-post" component={CreatePost} />
        <PrivateRoute exact path="/edit-post/:id" component={EditPost} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

const App = () => {
  useEffect(() => {
    store.dispatch(loaduser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={NotLanding} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
