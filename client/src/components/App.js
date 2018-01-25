import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

/**
 *  MOCKUP COMPONENTS
 */
const Navbar = () => <h1>Navbar component</h1>;
const Home = () => <h2>Home component</h2>;
const Login = () => <h2>Login component</h2>;
const Profile = () => <h2>Profile component</h2>;
const MovieLists = () => <h2>MovieLists component</h2>;
const MovieListDetail = () => <h2>MovieListDetail component</h2>;
const MovieDetail = () => <h2>MovieDetail component</h2>;
const Friends = () => <h2>Friends component</h2>;

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <div className="container">
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/movie/lists" component={MovieLists} />
              <Route exact path="/movie/list" component={MovieListDetail} />
              <Route exact path="/movie" component={MovieDetail} />
              <Route exact path="/friends" component={Friends} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
