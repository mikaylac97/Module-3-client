import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Landing from './components/Landing'
import Signup from './components/Authentication/Signup'
import Login from './components/Authentication/Login'
import AUTH_SERVICE from './services/AuthService'
import Search from './components/Search'
// import UserModel from '../../server-boilerplate-with-passport/models/User.model'
import UserProfile from './components/UserProfile'
import NavBar from './components/NavBar'
import AccountDetails from './components/AccountDetails'
import Bookshelves from './components/Bookshelves'
// import SearchResults from './components/SearchContainer'
// import SearchContainer from './components/SearchContainer'

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
      <NavBar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/search' render={props => <Search {...props} />} />
            <Route exact path='/signup' render={props => <Signup {...props} />} />
            <Route exact path='/login' render={props => <Login {...props} />} />
            <Route exact path='/profile/:accountId' component={UserProfile} />
            <Route exact path='/account/:accountId' component={AccountDetails} />
            <Route exact path='/shelves/:accountId' component={Bookshelves} />
            {/* <Route exact path='/results' render={props => <SearchContainer {...props} />} /> */}
          </Switch>
      </BrowserRouter>
      </div>
    )
  }
}
