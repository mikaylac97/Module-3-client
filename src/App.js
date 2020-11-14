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
import Discussion from './components/Create/Discussion'
import Review from './components/Create/Review'
import Reviews from './components/Reviews'
import Discussions from './components/Discussions'
import Followers from './components/Followers'
import Following from './components/Following'
// import SearchResults from './components/SearchContainer'
// import SearchContainer from './components/SearchContainer'

export default class App extends Component {

  state = {
    currentUser: null
  }

  componentDidMount = () => {
    console.log('component mounted', {AUTH_SERVICE});
    AUTH_SERVICE.getAuthenticatedUser()
    .then(responseFromServer => {
      
      console.log({responseFromServer: responseFromServer.data})

      this.setState({
        currentUser: responseFromServer.data
      })
    })
    .catch(err => console.log(err))
  }

  updateUser = user => {
    console.log({user})
    this.setState({ currentUser: user });
  }

  render() {
    console.log('user in client', this.state.currentUser)
    return (
      <div>
      <BrowserRouter>
      <NavBar user={this.state.currentUser} onUserChange={this.updateUser}/>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/search' render={props => <Search {...props} />} />
            <Route exact path='/signup' render={props => <Signup {...props} />} />
            <Route exact path='/login' render={props => <Login {...props} onUserChange={this.updateUser} />} />
            <Route exact path='/profile/:accountId' component={UserProfile} />
            <Route exact path='/account/:accountId' component={AccountDetails} />
            <Route exact path='/shelves/:accountId' component={Bookshelves} />
            <Route exact path='/discuss/:bookId' component={Discussion} />
            <Route exact path='/discussions/:accountId' component={Discussions} /> 
            <Route exact path='/review/:bookId' component={Review} />
            <Route exact path='/reviews/:accountId' component={Reviews} />
            <Route exact path='/followers/:accountId' component={Followers} />
            <Route exact path='/following/:accountId' component={Following} />
            {/* <Route exact path='/results' render={props => <SearchContainer {...props} />} /> */}
          </Switch>
      </BrowserRouter>
      </div>
    )
  }
}
