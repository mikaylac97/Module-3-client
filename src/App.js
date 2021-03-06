import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Landing from './components/Landing'
// import Signup from './components/Authentication/Signup'
// import Login from './components/Authentication/Login'
import AUTH_SERVICE from './services/AuthService'
import Search from './components/Search'
import UserProfile from './components/UserProfile'
import NavBar from './components/NavBar'
import AccountDetails from './components/AccountDetails'
import Bookshelves from './components/Bookshelves'
import Discussion from './components/Create/Discussion'
import DiscussionDetails from './components/DiscussionDetails'
import Review from './components/Create/Review'
import ReviewDetails from './components/ReviewDetails'
import Reviews from './components/Reviews'
import Discussions from './components/Discussions'
import Followers from './components/Followers'
import Following from './components/Following'
import BookDetails from './components/BookDetails'
import Timeline from './components/Timeline'
import Footer from './components/Footer'
// import CreateReview from './components/Create/Review'
// import CreateDiscussion from './components/Create/Discussion'

export default class App extends Component {

  state = {
    currentUser: null,
    reviews: [],
    discussions: []
  }

  componentDidMount() {
    // console.log('component mounted', {AUTH_SERVICE});
    this.updateUser();
  }

  updateUser = user => {
    // this.setState({ currentUser: user })
    AUTH_SERVICE.getAuthenticatedUser()
    .then(responseFromServer => {
      console.log(`auth user in App.js ${responseFromServer}`)
      this.setState({
        currentUser: responseFromServer.data
      })
    })
    .catch(err => { 
      console.log('error in update user', err);
      this.setState({currentUser: null});
    });
  }

  setUser = user => {
    this.setState({
      currentUser: user
    })
  }

  render() {
    console.log('user in client', this.state.currentUser)
    return (
      <div>
    
      <NavBar user={this.state.currentUser} onUserChange={this.updateUser}/>
          <Switch>
            <Route exact path='/' render={props => <Landing {...props} user={this.state.currentUser} onUserChange={this.setUser}/>} />
            <Route exact path='/search' render={props => <Search {...props} />} />
            {/* <Route exact path='/signup' render={props => <Signup {...props} />} />
            <Route exact path='/login' render={props => <Login {...props} onUserChange={this.updateUser} />} /> */}
            <Route exact path='/profile/:accountId' render={props => <UserProfile {...props} user={this.state.currentUser} onUserChange={this.updateUser} /> }/>
            <Route exact path='/account/:accountId' render={props => <AccountDetails {...props} user={this.state.currentUser} onUserChange={this.updateUser} />} />
            <Route exact path='/shelves/:accountId' render={props => <Bookshelves {...props} user={this.state.currentUser} /> } />
            <Route exact path='/discuss/:bookId' render={props => <Discussion {...props} user={this.state.currentUser} />} />
            <Route exact path='/discussions/:accountId' render={props => <Discussions {...props} user={this.state.currentUser} onUserChange={this.updateUser} /> } />
            <Route exact path='/discussinfo/:discussionId' render={props => <DiscussionDetails {...props} user={this.state.currentUser} />} /> 
            <Route exact path='/review/:bookId' render={props => <Review {...props} user={this.state.currentUser} />} />
            <Route exact path='/reviewinfo/:reviewId' render={props => <ReviewDetails {...props} user={this.state.currentUser} />} />
            <Route exact path='/reviews/:accountId' render={props => <Reviews {...props} user={this.state.currentUser} onUserChange={this.updateUser}/>} />
            <Route exact path='/followers/:accountId' component={Followers} />
            <Route exact path='/following/:accountId' component={Following} />
            <Route exact path='/bookinfo/:bookId' render={props => <BookDetails {...props} user={this.state.currentUser} /> } />
            {/* <Route exact path='/home' render={props => <Timeline {...props} user={this.state.currentUser} /> } /> */}
            <Route exact path='/home' render={props => <Timeline {...props} user={this.state.currentUser} onUserChange={this.updateUser}/>} />
            {/* <Route exact path='/review/:bookId' render={props => <CreateReview {...props} user={this.state.currentUser} />} />
            <Route exact path='/discuss/:bookId' render={props => <CreateDiscussion {...props} user={this.state.currentUser} />} /> */}
          </Switch>
      <Footer />
      </div>
    )
  }
}
