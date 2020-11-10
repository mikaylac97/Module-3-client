import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Landing from './components/Landing'
import Signup from './components/Authentication/Signup'
import Login from './components/Authentication/Login'
import AUTH_SERVICE from './services/AuthService'
import Search from './components/Search'
// import UserModel from '../../server-boilerplate-with-passport/models/User.model'
import UserProfile from './components/UserProfile'

export default class App extends Component {

  state = {
    currentUser: null
  }

  componentDidMount = () => {
    Promise.all(AUTH_SERVICE.getAuthenticatedUser())
    .then(responseFromServer => {
      
      console.log(responseFromServer)

      // this.setState({
      //   currentUser: user
      // })
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log('user in client', this.state.currentUser)
    return (
      <div>
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/signup' render={props => <Signup {...props} />} />
            <Route exact path='/login' render={props => <Login {...props} />} />
            <Route exact path='/profile/:accountId' component={UserProfile} />
          </Switch>
      </BrowserRouter>
      </div>
    )
  }
}
