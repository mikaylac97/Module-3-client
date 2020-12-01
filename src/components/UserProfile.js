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
        const slicedReviews = this.state.reviews.slice(Math.max(this.state.reviews.length-3, 0))
        const slicedDiscussions = this.state.discussions.slice(Math.max(this.state.discussions.length-3, 0))
        if (!this.state.isLoggedInUser) return <div>Loading...</div>
        const isFollowing = this.props?.user?.user?.following.includes(this.props.match.params.accountId)
        // console.log(this.state.following)
        const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        // console.log(this.state.reviews.length)
        return (
            // <div>
            //     <div className='container-fluid site-container'>
            //         <div className='row'>
            //             <div className='col-lg-9'>
            //                 <div className='container user-info-top'>
            //                     <div className='row info-content'>
            //                     <div>
            //                         <img src={this.state.profile_picture} alt='user-avi' className='user-avi'/>
            //                     </div>
            //                     <div className='user-top-text'>
            //                         <h2 className='username-profile'>{this.state.userName}</h2>
            //                         {isMyProfile && <p><Link to='/' className='link-profile-bio'>edit profile</Link></p>}
            //                         <p className='user-bio'>{this.state.bio}</p>
            //                     </div>
            //                     </div>
            //                 </div>
            //             <div className='container'>    
            //                 <div className='section-header'>
            //                     <h3 className='username-profile'>{this.state.userName} recently reviewed:</h3>
            //                 </div>
                           
            //                 <div className='row review-container'>
            //                 {slicedReviews.map(review => {
            //                     return(
                                   
            //                     <div className="col-sm-3">
            //                         <div class="card" style={{width: "18rem;"}}>
            //                         <img class="card-img-top" src={review.book.image_url} alt="Card cap" />
            //                         <div class="card-body">
            //                             <h5 class="card-title">{review.numOfStars} / 5</h5>
            //                             <p class="card-text">{review.content}</p>
            //                         </div>
            //                         <div class="card-body">
            //                             <Link to={`reviewinfo/${review._id}`} className="card-link">Details</Link>
            //                         </div>
            //                         </div>
            //                     </div>
            //                 )})}
                                
            //                 </div>
            //             </div>
            //             <div className='container testing-style'>
            //             <div className='section-header'>
            //                     <h3 className='username-profile'>{this.state.userName} recently discussed:</h3>
            //                 </div>
            //                 <div className='row discussion-container'>
            //                 {slicedDiscussions.map(discussion => {
            //                     return(
                                   
            //                     <div className="col-sm-3">
            //                         <div class="card" style={{width: "18rem;"}}>
            //                         <img class="card-img-top" src={discussion.book.image_url} alt="Card cap" />
            //                         <div class="card-body">
            //                             <h5 class="card-title">{discussion.title}</h5>
            //                             <p class="card-text">{discussion.discussionContent}</p>
            //                         </div>
            //                         <div class="card-body">
            //                             <Link to={`discussinfo/${discussion._id}`} className="card-link">Details</Link>
            //                         </div>
            //                         </div>
            //                     </div>
            //                 )})}
                                
            //                 </div>
            //                 </div>
            //                 </div>
            //                 <div className='col-lg-3'>
            //                 <div className='profile-links-container'>
            //                     <ul className='profile-links'>
            //                     {!isMyProfile && isFollowing && <li>
            //                         <button onClick={this.handleFollowAndUnfollow}>Unfollow</button>
            //                     </li>}
            //                     {!isMyProfile && !isFollowing && <li>
            //                         <button onClick={this.handleFollowAndUnfollow}>Follow</button>
            //                     </li>}
            //                         <li>
            //                         <img src="https://img.icons8.com/ios/50/000000/star-half.png" alt='review-icon'/>
            //                             <Link className='profile-li' to={`/reviews/${this.props.match.params.accountId}`}>Reviews</Link>
            //                         </li>
            //                         <li>
            //                         <img src="https://img.icons8.com/fluent-systems-regular/48/000000/comment-discussion.png" alt='discuss-icon'/>
            //                             <Link className='profile-li' to={`/discussions/${this.props.match.params.accountId}`}>Discussions</Link>
            //                         </li>
            //                         <li>
            //                         <img src="https://img.icons8.com/pastel-glyph/50/000000/books.png" alt='shelf-icon'/>
            //                             <Link className='profile-li' to={`/shelves/${this.props.match.params.accountId}`}>Shelves</Link>
            //                         </li>
            //                     </ul>
            //                 </div>
            //                 <div className='usr-follow'>
            //                      <div className='user-following'>
            //                         <p>Following</p>
            //                         {this.state.following.map(following => {
            //                             return(
            //                                 <Link to={`/profile/${following?._id}`}>
            //                                     <img src={following?.photo} alt='usr-avi' className='user-avi-side'/>
            //                                 </Link>
            //                             )
            //                         })}
            //                      </div>
            //                      <div className='user-followers'>
            //                         <p>Followers</p>
            //                         {this.state.followers.map(follower => {
            //                             return(
            //                                 <Link to={`/profile/${follower?._id}`}>
            //                                 <img src={follower?.photo} alt='usr-avi' className='user-avi-side'/>
            //                                 </Link>
            //                             )
            //                         })}
            //                      </div>
            //                 </div>
            //             </div>
            //             </div>
            //         </div>
            //     </div>

<div className='container-fluid site-container'>
    <div className='row'>
        <div className='col-lg-4'>
        <div className='container user-info'>
                <div className='row user-info-top'>
                    <div className='profile-name-img'>
                        <img src={this.state.profile_picture} alt='user-avi' className='usr-avi-timeline'/>
                        <h2 className='username-profile'>{this.state.userName}</h2>
                    </div>
                    <div className='user-info-right'>
                    {!isMyProfile && isFollowing && <li>
                            <button onClick={this.handleFollowAndUnfollow}>Unfollow</button>
                                 </li>}
                                 {!isMyProfile && !isFollowing && <li>
                                     <button onClick={this.handleFollowAndUnfollow}>Follow</button>
                                 </li>}
                    {isMyProfile && <>
                        <Link to={`/account/${this.props.user?.user?._id}`}><img src="https://img.icons8.com/pastel-glyph/64/000000/edit--v1.png" alt='edit-profile'/></Link>
                    </>}
                    </div>
                </div>
                <div className='row'>
                    <ul className='profile-followers'>
                        <li>{this.state.followers.length} Followers</li>
                        <li>{this.state.following.length} Following</li>
                    </ul>
                </div>
                <div className='row user-profile-bio'>
                    <p className='user-bio'>{this.state.bio}</p>
                </div>
                <hr />
                <div className='row'>
                    <ul className='profile-links'>
                        <li>
                            <img src="https://img.icons8.com/ios/50/000000/star-half.png" alt='review-icon'/>
                            <Link className='profile-li' to={`/reviews/${this.props.match.params.accountId}`}>{this.state.reviews.length===1 && <>1 Review</>}{this.state.reviews.length===0 || this.state.reviews.length > 1 && <>{this.state.reviews.length} Reviews</>}</Link>
                        </li>
                        <li>
                            <img src="https://img.icons8.com/fluent-systems-regular/48/000000/comment-discussion.png" alt='discuss-icon'/>
                            <Link className='profile-li' to={`/discussions/${this.props.match.params.accountId}`}>{this.state.discussions.length===1 && <>1 Discussion</>}{this.state.discussions.length===0 || this.state.discussions.length > 1 && <>{this.state.discussions.length} Discussions</>}</Link>
                        </li>
                        <li>
                        <img src="https://img.icons8.com/pastel-glyph/50/000000/books.png" alt='shelf-icon'/>
                        <Link className='profile-li' to={`/shelves/${this.props.match.params.accountId}`}>{this.state.want_to_read.length+this.state.has_read.length} Shelves</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='col-lg-8'>
            <div className='container'>    
                            <div className='section-header'>
                                <h3 className='username-profile'>Recent Reviews</h3>
                            </div>
                           
                            <div className='row review-container'>
                            {slicedReviews.map(review => {
                                return(
                                   
                                <div className="col-sm-3">
                                    <Link to={`/reviewinfo/${review._id}`}>
                                        <img src={review.book.image_url} alt='book-cover'/>
                                    </Link>
                                    
                                </div>
                            )})}
                                
                            </div>
                        </div>
                        <div className='container testing-style'>
                        <div className='section-header'>
                                <h3 className='username-profile'>Recent Discussions</h3>
                            </div>
                            <div className='row discussion-container'>
                            {slicedDiscussions.map(discussion => {
                                return(
                                   
                                <div className="col-sm-3">
                                    {/* <div class="card" style={{width: "18rem;"}}>
                                    <img class="card-img-top" src={discussion.book.image_url} alt="Card cap" />
                                    <div class="card-body">
                                        <h5 class="card-title">{discussion.title}</h5>
                                        <p class="card-text">{discussion.discussionContent}</p>
                                    </div>
                                    <div class="card-body">
                                        <Link to={`discussinfo/${discussion._id}`} className="card-link">Details</Link>
                                    </div>
                                    </div> */}
                                    <Link to={`/discussinfo/${discussion._id}`}>
                                        <img src={discussion.book.image_url} alt='book-cover'/>
                                    </Link>
                                </div>
                            )})}
                                
                </div>
            </div>
        </div>
    </div>
</div>
           
        )
    }
}


