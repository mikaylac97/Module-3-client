import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Followers extends Component {
    state = {
        isLoggedIn: false,
        followers: []
    }

    componentDidMount(){
        this.getUserFollowers();
    }

    getUserFollowers = () => {
        ACCOUNT_SERVICE
            .getUserProfile(this.props.match.params.accountId)
            .then(user => {
                this.setState({
                    isLoggedIn: user.data.authorized,
                    followers: user.data.user.followers
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
