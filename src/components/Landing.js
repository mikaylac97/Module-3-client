import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Search from './Search'
import AUTH_SERVICE from '../services/AuthService'
// import NavBar from './NavBar'
// import Signup from './Authentication/Signup'
// import Login from './Authentication/Login'
// import Search from './Search'


export default class Landing extends Component {
    
    state = {
        newHere: true,
        currentUser: null
    }

    componentDidMount(){
        this.updateUser(this.state.currentUser);
    }

    handleNewHereState = (event) => {
        event.preventDefault();
        this.setState({
            newHere: !this.state.newHere
        })
    }

    updateUser = user => {
        
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

    // handleInputChange = event => {
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value });
    // }

    // handleFormSubmission = event => {
    //     event.preventDefault(); 
    //     const { email, password } = this.state;
    
    //     AUTH_SERVICE.login({ email, password })
    //       .then(responseFromServer => {
           
    //         const { user } = responseFromServer.data;
            
    //         // Lift the user object to the App.js
    //         this.props.onUserChange(user);
    
    //         // Redirect user to home page after successful sign up
    //         this.props.history.push(`/profile/${user?.user?._id}`);
        
    //       })
    //       .catch(err => {
    //         if (err.response && err.response.data) {
    //           return this.setState({ message: err.response.data.message });
    //         }
    //       });
    //   };



    render() {
       console.log(this.props.state)
        return (
            <div className='container-desktop'>
                <div className='row landing-cover'>
                    <div className='col-lg-8'>
                        <h1>Join our community of readers</h1>
                    </div>
                    <div className='auth-landing col-lg-4'>  
                        {/* <Login /> */}
                        {!this.state.newHere && <>
                            <div className='landing-login'>
                                <h3>Welcome to Bookr</h3>
                                <Login updateUserOnLanding={this.updateUser}/>
                                <hr />
                            </div>
                            <div>
                                <Link to='/' onClick={event => this.handleNewHereState(event)}>New here? Create an account for free!</Link>   
                            </div>
                        </>}
                        {this.state.newHere && <div>
                        <div className='landing-login'>
                            <h3>Sign up and start reading today!</h3>
                            <Signup />
                            <hr />
                        </div>
                        <div>
                            <Link to='/' onClick={event => this.handleNewHereState(event)}>Already have an account? Log in</Link>
                        </div>
                            
                        </div>}
                    </div>
                    {/* <img src='https://media.istockphoto.com/photos/composition-with-books-on-the-table-picture-id1158413597?k=6&m=1158413597&s=612x612&w=0&h=bmVCZh_ephJcCbbzAw0bFNk0KYlDL4k_4a5xZeFcqaw=' alt='cover' className='landing-cover'></img> */}
                </div>
                <div className='row search-section'>
                    <div className='col-md-3'>
                        <h2>Search your favorite books</h2>
                        <p>Bookr's search engine is powered by the Google Books API, one of the most extensive book APIs available.</p>
                        <Search />
                    </div>
                    <div className='col-md-9 popular-searches'>
                        <h2>Popular Searches</h2>
                        <ul className='searches-landing'>
                            <li><Link to='bookinfo/9mEh1dJTw5cC' className='link-white-txt'>Doctor Sleep</Link></li>
                            <li><Link to='/bookinfo/qYqHPwAACAAJ' className='link-white-txt'>Giovanni's Room</Link></li>
                            <li><Link to='/bookinfo/PxNcDwAAQBAJ' className='link-white-txt'>The 7 1/2 Deaths of Evelyn Hardcastle</Link></li>
                            <li><Link to='/bookinfo/z9Q99X-OOtAC' className='link-white-txt'>The Secret</Link></li>
                            <li><Link to='/bookinfo/Y_VuDwAAQBAJ' className='link-white-txt'>Sharp Objects</Link></li>
                            <li><Link to='/bookinfo/hxCkDgAAQBAJ' className='link-white-txt'>The Woman in the Window</Link></li>
                            <li><Link to='/bookinfo/WrL9de30FDMC' className='link-white-txt'>The Girl with the Dragon Tattoo</Link></li>
                            <li><Link to='/bookinfo/kotPYEqx7kMC' className='link-white-txt'>1984</Link></li>
                            <li><Link to='/bookinfo/lclWAAAAQBAJ' className='link-white-txt'>If Beale Street Could Talk</Link></li>
                            <li><Link to='/bookinfo/SGAZdjNfruYC' className='link-white-txt'>Animal Farm</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='row features-section'>
                <div className='container-fluid'>
                    <div className='row features-title'>
                        <h1>Why Bookr?</h1>
                        <hr />
                    </div>
                    <div className='row'>
                    <div className='col-lg-4 try-search'>
                        {this.state.newHere && <>
                            <h2>Get started</h2>
                            <Signup />
                            <hr />
                            <Link to='/' onClick={event => this.handleNewHereState(event)}>Already have an account? Log in</Link>
                        </>}
                        {!this.state.newHere && <>
                            <h2>Login</h2>
                            <Login user={this.props.user?.user} onUserChange={this.updateUser}/>
                            <hr />
                            <Link to='/' onClick={event => this.handleNewHereState(event)}>New here? Create an account for free!</Link>
                        </>}
                    </div>
                    <div className='col-lg-8'>
                    <div className='container-fluid'>
        
                        <div className='row features-container'>
                            <div className='col-lg-6'>
                                <div className='feat-item'>
                                   <h3>Connect with other readers</h3>
                                   <p>Follow your friends to keep up with their recent reviews and discussions</p>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='feat-item'>
                                    <h3>Rate and review books you've read</h3>
                                    <p>Share your thoughts on your favorite (and least favorite) books with the Bookr community</p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='feat-item'>
                                    <h3>Start and join discussions</h3>
                                    <p>Have something you want to talk about? Start discussions with the community to get the conversation started, or simply join in to existing discussions</p>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='feat-item'>
                                    <h3>Create bookshelves</h3>
                                    <p>Keep track of books you've read and want to read in your personal online bookshelf</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                    </div>
                </div>
                
                
                </div>
            </div>
        )
    }
}


