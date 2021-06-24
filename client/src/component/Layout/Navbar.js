import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Updates from "./Updates";
import PropTypes from "prop-types";

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Contractors</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  const userLinks = (
    <ul>
      <li>
        <Link to="/profiles">Contractors</Link>
      </li>
      <li>
        <Link to="/posts">Projects</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      {user && (
        <li>
          <Updates updates={user.updates} />
        </li>
      )}
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"> </i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i class="fas fa-home"></i>ContraConnector
        </Link>
      </h1>
      {!loading && <>{isAuthenticated && user ? userLinks : guestLinks}</>}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
