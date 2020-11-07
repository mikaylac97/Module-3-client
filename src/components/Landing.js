import React from 'react'
import NavBar from './NavBar'
import Signup from './Authentication/Signup'
import Login from './Authentication/Login'
import Search from './Search'

export default function Landing() {
    return (
        <div>
            {/* <Signup />
            <Login />
            <Search /> */}
            <NavBar />
        </div>
    )
}
