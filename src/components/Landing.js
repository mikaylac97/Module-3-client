import React, { Component } from 'react'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
// import NavBar from './NavBar'
// import Signup from './Authentication/Signup'
// import Login from './Authentication/Login'
// import Search from './Search'


export default class Landing extends Component {

    state = {
        newHere: false
    }

    render() {
        return (
            <div className='container-desktop'>
                <div className='row landing-cover'>
                    <div>testing</div>
                    <div className='auth-landing'>  
                        {/* <Login /> */}
                        {!this.state.newHere && <>
                            <div>
                                <Login />
                            </div>
                            <div>
                                New here? Create an account for free!
                            </div>
                        </>}
                        {this.state.newHere && <>
                            <Signup />
                        </>}
                    </div>
                    {/* <img src='https://media.istockphoto.com/photos/composition-with-books-on-the-table-picture-id1158413597?k=6&m=1158413597&s=612x612&w=0&h=bmVCZh_ephJcCbbzAw0bFNk0KYlDL4k_4a5xZeFcqaw=' alt='cover' className='landing-cover'></img> */}
                </div>
                <div className='row'>

                </div>
            </div>
        )
    }
}


