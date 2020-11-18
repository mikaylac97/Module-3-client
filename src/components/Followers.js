import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        console.log(this.state.followers)
        return (
            <div>
                {this.state.followers.map(follower => {
                    return(
                        <div key={follower._id}>
                            <img src={follower.photo} alt='follower-avi' />
                            <Link to={`/profile/${follower._id}`}><p>{follower.username}</p></Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}
