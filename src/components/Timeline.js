import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Timeline extends Component {
    state = {
        usersTheyFollowAndPosts: [],
        viewingDiscussions: false
    }

    componentDidMount(){
        this.getUsersTimeline();
    }

    getUsersTimeline = () => {
        ACCOUNT_SERVICE
            .getTimeline()
            .then(responseFromDB => {
                // console.log(responseFromDB.data)
                this.setState({
                    usersTheyFollowAndPosts: responseFromDB.data.timelinePosts
                })
            })
            .catch(err => console.log(err))
    }

    switchToDiscussionsView = () => {
        this.setState({
            viewingDiscussions: !this.state.viewingDiscussions
        })
    }

    render() {
        console.log(this.state.usersTheyFollowAndPosts)
        const { user } = this.props.user
        // const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        return (
            <div className='container-fluid site-container'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div>
                            <img src={user?.photo} alt='usr-avi' className='user-avi' />
                            <p>{user?.username}</p>
                            {!this.state.viewingDiscussions && <button onClick={this.switchToDiscussionsView}>View Discussions</button>}
                            {this.state.viewingDiscussions && <button onClick={this.switchToDiscussionsView}>View Reviews</button>}
                        </div>
                    </div>
                    <div className='col-lg-9'>
                    {!this.state.viewingDiscussions && <div>
                    <h2>Reviews from people you follow</h2>
                        {this.state.usersTheyFollowAndPosts.map(personTheyFollow => {
                            return(
                                <div>
                                {personTheyFollow.reviews.map(review => {
                                    return(
                                        <div key={review._id}>
                                            <img src={personTheyFollow.photo} alt='user' className='usr-avi-timeline' />
                                            <p>{personTheyFollow.username}</p>
                                            <h4>{review.book?.title}</h4>
                                            <p>{review.numOfStars}</p>
                                            <p>{review.content}</p>
                                        </div>
                                    )
                                
                            })}
                                </div>
                            )
                            
                        })}
                        </div>}
                        {this.state.viewingDiscussions && <div>
                            <h2>Discussions from people you follow</h2>
                            {this.state.usersTheyFollowAndPosts.map(personTheyFollow => {
                                return(
                                    <div>
                                    {personTheyFollow.discussions.map(discussion => {
                                        return(
                                            <div key={discussion._id} className='timeline-item container'>
                                            <div className='usr-info-timeline row'>
                                                <img src={personTheyFollow.photo} alt='user' className='usr-avi-timeline' />
                                                <Link to={`/profile/${personTheyFollow._id}`}>{personTheyFollow.username}</Link>
                                            </div>
                                            <div className='post-content row'>
                                                <div className='post-book-img col-md-3'>
                                                    <img src={discussion.book?.image_url} alt='book-cvr' />
                                                </div>
                                                <div className='post-text-content col-md-9'>
                                                    <h4>{discussion.book?.title} by: {discussion.book?.authors}</h4>
                                                    <h5>{discussion.title}</h5>
                                                    <p>{discussion.content}</p>
                                                </div>
                                            </div>
                                            </div>
                                        )
                                    })}
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}
