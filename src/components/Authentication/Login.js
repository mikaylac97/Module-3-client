import React from 'react';
// import { Link } from 'react-router-dom'

import AUTH_SERVICE from '../../services/AuthService';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    message: null,
    loggedInUser: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  handleFormSubmission = event => {
    event.preventDefault(); 

    const { email, password } = this.state;

    AUTH_SERVICE.login({ email, password })
      .then(responseFromServer => {
       
        const { user } = responseFromServer.data;
        console.log(this.props);
        // Lift the user object to the App.js
        this.props.onUserChange(user);

        // Redirect user to home page after successful sign up
        this.props.history.push(`/profile/${user._id}`);
    
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {
    // console.log(this.state.loggedInUser)
    return (
      <>
          <form onSubmit={this.handleFormSubmission} className='landing-form'>
            <label>
              Email:
              <input
                name='email'
                type='email'
                placeholder='ana@ironhack.com'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Password:
              <input
                name='password'
                type='password'
                placeholder='**********'
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
            <button type='submit' className='details-btn'> Login </button>
            
          </form>

          {/* if the message is not NULL then show the message */}
          {this.state.message && <div> {this.state.message} </div>}
      </>
    );
  }
}