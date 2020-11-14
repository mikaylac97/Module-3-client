import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Discussions extends Component {
    state = {
        isLoggedIn: false,
        discussions: []
    }


    componentDidMount(){
        this.getUsersDiscussions();
    }

    getUsersDiscussions = () => {
        ACCOUNT_SERVICE
            .getUserProfile(this.props.match.params.accountId)
            .then(userFromDB => {
                this.setState({
                    isLoggedIn: userFromDB.data.authorized,
                    discussions: userFromDB.data.user.discussions
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state.isLoggedIn)
        console.log(this.state.discussions)
        return (
            <div>
                
            </div>
        )
    }
}
