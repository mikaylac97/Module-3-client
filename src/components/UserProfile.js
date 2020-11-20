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

    getUserDetails =  () => {
        const { params } = this.props.match
        ACCOUNT_SERVICE
            .getUserProfile(params.accountId)
            .then(responseFromApi => {
                this.props.onUserChange(responseFromApi.data.user)
                // console.log(responseFromApi);
                this.setState({
                    isLoggedInUser: true,
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

    handleFollowAndUnfollow = () => {
        ACCOUNT_SERVICE
            .followAndUnfollow(this.props.match.params.accountId)
            .then(responseFromApi => this.props.onUserChange(responseFromApi.data.updatedCurrentUser))
            .catch(err => console.log(err))
    }


    render() {
        // console.log(this.props.user?._id)
        // console.log('props', this.props)
        // console.log(this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString())
        // console.log(this.state.isLoggedInUser)
        // console.log({user: this.props?.user?.user?._id, params: this.props.match.params.accountId})
        // if (!this.props.user?.user?._id) return  <div>Loading....</div>
        if (!this.state.isLoggedInUser) return <div>Loading...</div>
        const isFollowing = this.props?.user?.user?.following.includes(this.props.match.params.accountId)
        // console.log(this.state.following)
        const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        return (
    
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-9'>
                            <div>
                                <img src={this.state.profile_picture} alt='user-avi' className='user-avi'/>
                            </div>
                            <div>
                                <h2>{this.state.userName}</h2>
                                {isMyProfile && <p><Link to='/'>edit profile</Link></p>}
                                <p>{this.state.bio}</p>
                            </div>
                            {/* <div>
                                <div>
                                    <h3>Has Read</h3>
                                </div>
                                <div>
                                    <h3></h3>
                                </div>
                            </div> */}
                        </div>
                        <div className='col-lg-3'>
                            <div>
                                <ul className='profile-links'>
                                {!isMyProfile && isFollowing && <li>
                                    <button onClick={this.handleFollowAndUnfollow}>Unfollow</button>
                                </li>}
                                {!isMyProfile && !isFollowing && <li>
                                    <button onClick={this.handleFollowAndUnfollow}>Follow</button>
                                </li>}
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


