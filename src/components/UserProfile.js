import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class UserProfile extends Component {
    state = {
        isLoggedInUser: false,
        profile_picture: '',
        bio: '',
        userName: '',
        has_read: [],
        want_to_read: [],
        reviews: [],
        discussions: [],
        followers: [],
        following: []
    }

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails = () => {
        const { params } = this.props.match;
        ACCOUNT_SERVICE
            .getUserProfile(params.accountId)
            .then(responseFromApi => {
                // console.log(responseFromApi)
                this.setState({
                    isLoggedInUser: responseFromApi.data.authorized,
                    profile_picture: responseFromApi.data.user.photo,
                    userName: responseFromApi.data.user.username,
                    has_read: responseFromApi.data.user.hasRead,
                    want_to_read: responseFromApi.data.user.wantToRead,
                    reviews: responseFromApi.data.user.reviews,
                    discussions: responseFromApi.data.user.discussions,
                    followers: responseFromApi.data.user.followers,
                    following: responseFromApi.data.user.following
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state)
        return (
            <div>
                user: {this.state.userName}
                <br />
                followers: {this.state.followers.length}
                <br />
                following: {this.state.following.length}
                <br />
                profile_picture: <img src={this.state.profile_picture} alt='avi' />
                <br />
                bookshelves - 
                <br />
                has read: {this.state.has_read}
                <br />
                wants to read: {this.state.want_to_read}
                <br />
                reviews: {this.state.reviews.map(review => {
                    return (
                        <div>
                            {review.numOfStars}
                            {review.content}
                            {review.book}
                        </div>
                    )
                })}
            </div>
        )
    }
}
