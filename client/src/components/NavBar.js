import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../actions";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick() {
    this.props.logoutUser();
  }

  writeLogstatus() {
    if (this.props.auth) {
      return "user is logged in";
    }
    return "user is logged out";
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
      case false:
        return [
          <li key="10">
            <Link to="/login">Login</Link>
          </li>
        ];
      default:
        return [
          <li key="1">
            <Link className="btn" onClick={this.onLogoutClick} to="/">
              Logout
            </Link>
          </li>,
          <li key="2">
            <Link to="/dashboard">Dashboard</Link>
          </li>,
          <li key="3">
            <Link to="/profile">Profile</Link>
          </li>,
          <li key="4">
            <Link to="/movie/lists">Movie lists</Link>
          </li>,
          <li key="5">
            <Link to="/friends">Friends</Link>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="left brand-logo">
            Home
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(NavBar);
