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
            .then((blah) => {
                console.log('logged out!', {blah});
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
            <nav className="navbar navbar-light nav-font">
                <div>
                    <Link to='/home' className='home-btn'><h2>BOOKR.</h2></Link>
                </div>
                {this.props.user && 
                <>
                    <div>
                    <ul className='nav-ul'>
                        <li>
                            <Link className='nav-links' to='/home'>Home</Link>
                        </li>
                        <li>
                            <Link className='nav-links' to={`/shelves/${this.props.user?.user?._id}`}>My Shelves</Link>
                        </li>
                        <li>
                        <div className="dropdown">
                            <button className="btn tan-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               Account
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" to={`/profile/${this.props.user?.user?._id}`}>Profile</Link>
                                <Link className="dropdown-item" to={`/account/${this.props.user?.user?._id}`}>Account Details</Link>
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
                    {/* <button className='logged-out-login'><Link to='/login' className='nav-links'>Log In</Link></button>
                    <button className='logged-out-signup details-btn'><Link to='/signup' className='link-white-txt'>Sign Up</Link></button> */}
                    <Search />
                </div>}
               
            </nav>
        )
    }
}
