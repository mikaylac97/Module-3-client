import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Discussions extends Component {
    state = {
        // isLoggedIn: false,
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
                    // isLoggedIn: userFromDB.data.authorized,
                    discussions: userFromDB.data.user.discussions
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        // console.log(this.state.isLoggedIn)
        console.log(this.state.discussions)
        const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        console.log(isMyProfile)
        return (
            <div>
                {this.state.discussions.map(discussion => {
                    return(
                        <div key={discussion._id}>
                            <h2>{discussion.title}</h2>
                            <h4>Regarding: {discussion.book.title} By: {discussion.book.authors}</h4>
                            <p>{discussion.content}</p>
                            
                        </div>
                    )
                })}
            </div>
        )
    }
}
