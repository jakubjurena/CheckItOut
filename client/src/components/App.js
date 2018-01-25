import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

/**
 *  MOCKUP COMPONENTS
 */
import Navbar from "./NavBar";
import LoginPage from "./pages/LoginPage";
const HomePage = () => <h2>HomePage component</h2>;

const DashboarPage = () => <h2>DashboarPage component</h2>;
const ProfilePage = () => <h2>ProfilePage component</h2>;
const MovieListsPage = () => <h2>MovieListsPage component</h2>;
const MovieListDetailPage = () => <h2>MovieListDetailPage component</h2>;
const MovieDetailPage = () => <h2>MovieDetailPage component</h2>;
const FriendsPage = () => <h2>FriendsPage component</h2>;

/**
 *  APP CLASS
 */
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  checkAuth(nextState, replaceState) {
    const user = this.props.auth;

    if (user) {
      replaceState(null, nextState.location.pathname);
    } else {
      replaceState(null, "/");
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <div className="container">
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              {/*TODO fix checkAuth ---> it doesn't work*/}
              <Route onEnter={this.checkAuth}>
                <div>
                  <Route exact path="/dashboard" component={DashboarPage} />
                  <Route exact path="/profile" component={ProfilePage} />
                  <Route exact path="/movie/lists" component={MovieListsPage} />
                  <Route
                    exact
                    path="/movie/list"
                    component={MovieListDetailPage}
                  />
                  <Route exact path="/movie" component={MovieDetailPage} />
                  <Route exact path="/friends" component={FriendsPage} />
                </div>
              </Route>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(App);
