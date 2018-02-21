import React, { Component } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router";

import * as actions from "../../actions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        email: "",
        password: ""
      },
      signup: {
        email: "",
        password: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const id = target.id;

    const login = this.state.login;
    const signup = this.state.signup;

    switch (id) {
      case "login_email":
        login.email = target.value;
        this.setState({
          login
        });
        break;
      case "login_password":
        login.password = target.value;
        this.setState({
          login
        });
        break;
      case "signup_email":
        signup.email = target.value;
        this.setState({
          signup
        });
        break;
      case "signup_password":
        signup.password = target.value;
        this.setState({
          signup
        });
        break;
      default:
    }
  }

  handleLoginSubmit(event) {
    this.props.loginUser(this.state.login.email, this.state.login.password);
    event.preventDefault();
  }

  handleSignupSubmit(event) {
    this.props.signupUser(this.state.signup.email, this.state.signup.password);
    event.preventDefault();
  }

  render() {
    if (this.props.auth) {
      return <Redirect to="/dashboard" />;
    }

    const formStyle = {
      margin: "50px"
    };

    let signupError = "";
    if (this.props.error && this.props.error.signup) {
      signupError = this.props.error.signup;
    }
    let loginError = "";
    if (this.props.error && this.props.error.login) {
      loginError = this.props.error.login;
    }

    return (
      <div className="center">
        <div className="col s12 m5">
          <div className="card-panel teal">
            <span className="white-text">
              This is only dev site. This connection is not secure. Logins
              entered here can be compromised!
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col l6 center-align">
            <h2>Login form</h2>

            <p>{loginError}</p>

            <form style={formStyle} onSubmit={this.handleLoginSubmit}>
              <div className="input-field">
                <input
                  id="login_email"
                  type="email"
                  className="validate"
                  required
                  onChange={this.handleInputChange}
                />
                <label htmlFor="email" data-error="Please, enter valid email">
                  Email
                </label>
              </div>
              <div className="input-field">
                <input
                  id="login_password"
                  type="password"
                  className="validate"
                  required
                  onChange={this.handleInputChange}
                />
                <label htmlFor="password">Password</label>
              </div>

              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="submit"
              >
                Submit local strategy
              </button>
            </form>
          </div>

          <div className="col l6">
            <h2>Sign up form</h2>

            <p>{signupError}</p>

            <form style={formStyle} onSubmit={this.handleSignupSubmit}>
              <div className="input-field  center">
                <input
                  id="signup_email"
                  type="email"
                  className="validate"
                  required
                  onChange={this.handleInputChange}
                />
                <label htmlFor="email" data-error="Please, enter valid email">
                  Email
                </label>
              </div>
              <div className="input-field ">
                <input
                  id="signup_password"
                  type="password"
                  className="validate"
                  required
                  onChange={this.handleInputChange}
                />
                <label htmlFor="password">Password</label>
              </div>

              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="submit"
              >
                Submit local strategy
              </button>
            </form>
          </div>
        </div>

        <p>or</p>
        <p>
          <a href="/auth/google" className="btn">
            Login with google
          </a>
        </p>
        <p>
          <a href="/auth/facebook" className="btn">
            Login with facebook
          </a>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors
  };
}

export default connect(mapStateToProps, actions)(Login);
