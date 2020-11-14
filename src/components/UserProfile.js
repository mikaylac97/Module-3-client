import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                console.log(responseFromApi.data)
                this.setState({
                    isLoggedInUser: responseFromApi.data.authorized,
                    profile_picture: responseFromApi.data.user.photo,
                    userName: responseFromApi.data.user.username,
                    has_read: responseFromApi.data.user.hasRead,
                    want_to_read: responseFromApi.data.user.wantToRead,
                    reviews: responseFromApi.data.user.reviews,
                    discussions: responseFromApi.data.user.discussions,
                    followers: responseFromApi.data.user.followers,
                    following: responseFromApi.data.user.following,
                    bio: responseFromApi.data.user.bio
                })
            })
            .catch(err => console.log(err))
    }


    render() {
       
        return (
                /* user: {this.state.userName}
                <br />
                followers: {this.state.followers.length}
                <br />
                following: {this.state.following.length}
                <br />
                profile_picture: <img src={this.state.profile_picture} alt='avi' />
                <br />
                bookshelves - 
                <br /> */
                /* has read: {this.state.has_read}
                <br />
                wants to read: {this.state.want_to_read}
                <br />
                reviews: {this.state.reviews.map(review => {
                    return (
                        <div>
                            {review.numOfStars}
                            {review.content}
                            {review.book ? review.book : ''}
                        </div>
                    )
                })} */
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-9'>
                            <div>
                                <img src={this.state.profile_picture} alt='user-avi' className='user-avi'/>
                            </div>
                            <div>
                                <h2>{this.state.userName}</h2>
                                {this.state.isLoggedInUser && <p><Link to='/'>edit profile</Link></p>}
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <div>
                                <ul className='profile-links'>
                                    <li>
                                        <Link to={`/reviews/${this.props.match.params.accountId}`}>Reviews</Link>
                                    </li>
                                    <li>
                                        <Link to={`/discussions/${this.props.match.params.accountId}`}>Discussions</Link>
                                    </li>
                                    <li>
                                        <Link to={`/followers/${this.props.match.params.accountId}`}>Followers</Link>
                                    </li>
                                    <li>
                                        <Link to={`/following/${this.props.match.params.accountId}`}>Following</Link>
                                    </li>
                                    <li>
                                        <Link to={`/shelves/${this.props.match.params.accountId}`}>Shelves</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
           
        )
    }
}
