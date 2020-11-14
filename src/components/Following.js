import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Follow extends Component {
    state = {
        isLoggedIn: false,
        following: []
    }

    componentDidMount(){
        this.getUserFollowing();
    }

    getUserFollowing = () => {
        ACCOUNT_SERVICE
            .getUserProfile(this.props.match.params.accountId)
            .then(user => {
                this.setState({
                    isLoggedIn: user.data.authorized,
                    following: user.data.user.following
                })
            })
            .catch(err => console.log(err))
    }



    render() {
        console.log(this.state.following)
        return (
            <div>
                
            </div>
        )
    }
}
