import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

    deleteDiscussion = (event) => {
        event.preventDefault();
        ACCOUNT_SERVICE
            .deleteDiscussion(event.target._id)
            .then(deletedDiscussion => this.props.history.push(`/reviews/${this.props.match.params.accountId}`))
            .catch(err => console.log(err))
    }

    render() {
        // console.log(this.state.isLoggedIn)
        // console.log(this.state.discussions)
        const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        // console.log(isMyProfile)
        return (
            <div>
                {this.state.discussions.map(discussion => {
                    return(
                        <div key={discussion._id}>
                            <h2>{discussion.title}</h2>
                            <h4>Discussing: {discussion.book.title} By: {discussion.book.authors}</h4>
                            <p>{discussion.content}</p>
                            {isMyProfile && <div>
                                <button><Link to={`/discussinfo/${discussion._id}`}>Details</Link></button>
                                <button id={discussion._id} onClick={event => this.deleteDiscussion(event)}>Delete</button>
                            </div>}
                        </div>
                    )
                })}
            </div>
        )
    }
}
