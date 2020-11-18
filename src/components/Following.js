import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                {this.state.following.map(following => {
                    return(
                        <div key={following._id}>
                            <img src={following.photo} alt='following-avi' />
                            <Link to={`/profile/${following._id}`}><p>{following.username}</p></Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}
