import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Timeline extends Component {
    state = {
        isLoggedIn: false
    }

    componentDidMount(){
        this.getUsersTimeline();
    }

    getUsersTimeline = () => {
        ACCOUNT_SERVICE
            .getTimeline()
            .then(responseFromDB => console.log(responseFromDB))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
