import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../services/AuthService'
import Search from './Search'
import '../App.css'

export default class NavBar extends Component {
    // state = {
    //     user_id: this.props.user?._id || null
    // }

    // componentDidMount() {
    //     this.getLoggedInUser();
    // }

    // getLoggedInUser = () => {
    //     AUTH_SERVICE
    //         .getAuthenticatedUser()
    //         .then(responseFromDB => {
    //             responseFromDB.data.user ? 
    //             this.setState({
    //                 isLoggedIn: true,
    //                 user_id: responseFromDB.data.user._id
    //             }) :
    //             this.setState({
    //                 isLoggedIn: false
    //             })
    //         })
    // }

    handleLogout = () => {
        console.log('route called')
        AUTH_SERVICE
            .logout()
            .then(() => {
                console.log('logged out!');
                this.props.onUserChange(null);
            //     this.setState({
            //     isLoggedIn: false
            // })
            // this.props.history.push('/');
        })
            .catch(err => console.log(err))
    }

    


    render() {
        console.log({props: this.props})
        return (
            <nav className="navbar navbar-light" >
                <div>
                    BOOKR.
                </div>
                {this.props.user && 
                <>
                    <div>
                    <ul>
                        <li>
                            <Link className='nav-links' to='/home'>Home</Link>
                        </li>
                        <li>
                            <Link className='nav-links' to={`/shelves/${this.props.user._id}`}>My Shelves</Link>
                        </li>
                        <li>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               Account
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" to={`/profile/${this.props.user._id}`}>Profile</Link>
                                <Link className="dropdown-item" to={`/account/${this.props.user._id}`}>Account Details</Link>
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
            {this.props.user === null  &&
                <div>
                    <button><Link to='/login'>Log In</Link></button>
                    <button><Link to='/signup'>Sign Up</Link></button>
                </div>}
               
            </nav>
        )
    }
}
