import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Timeline extends Component {
    state = {
        usersTheyFollowAndPosts: []
    }

    componentDidMount(){
        this.getUsersTimeline();
    }

    getUsersTimeline = () => {
        ACCOUNT_SERVICE
            .getTimeline()
            .then(responseFromDB => {
                this.setState({
                    usersTheyFollowAndPosts: responseFromDB.data
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        console.log(this.state.usersTheyFollowAndPosts)
        // const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        return (
            <div>
                
            </div>
        )
    }
}
