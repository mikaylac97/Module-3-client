import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../services/AuthService'
import Search from './Search'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import '../App.css'

export default class NavBar extends Component {
    state = {
        isLoggedIn: false,
        user_id: ''
    }

    componentDidMount() {
        this.getLoggedInUser();
    }

    getLoggedInUser = () => {
        AUTH_SERVICE
            .getAuthenticatedUser()
            .then(responseFromDB => {
                responseFromDB.data.user ? 
                this.setState({
                    isLoggedIn: true,
                    user_id: responseFromDB.data.user._id
                }) :
                this.setState({
                    isLoggedIn: false
                })
            })
    }

    handleLogout = () => {
        AUTH_SERVICE
            .logout()
            .then(this.setState({
                isLoggedIn: false
            }))
            .catch(err => console.log(err))
    }



    render() {
        console.log(this.state.isLoggedIn)
        return (
            <nav className="navbar navbar-light" >
                <div>
                    BOOKR.
                </div>
                {this.state.isLoggedIn && 
                <>
                    <div>
                    <ul>
                        <li>
                            <Link className='nav-links' to='/home'>Home</Link>
                        </li>
                        <li>
                            <Link className='nav-links' to={`/shelves/${this.state.user_id}`}>My Shelves</Link>
                        </li>
                        <li>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               Account
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" to={`/profile/${this.state.user_id}`}>Profile</Link>
                                <Link className="dropdown-item" to={`/account/${this.state.user_id}`}>Account Details</Link>
                                <Link className="dropdown-item" to='/' onClick={this.handleLogout}>Logout</Link>
                            </div>
                        </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <Search />
                </div>
                </>
            }
            {!this.state.isLoggedIn &&
                <div>
                    <button><Link to='/login'>Log In</Link></button>
                    <button><Link to='/signup'>Sign Up</Link></button>
                </div>}
               
            </nav>
        )
    }
}
