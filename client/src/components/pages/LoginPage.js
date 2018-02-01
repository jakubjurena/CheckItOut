import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="center">
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

export default Login;
