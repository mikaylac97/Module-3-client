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
            .then(deletedDiscussion => {
                this.props.history.push(`/discussions/${this.props.match.params.accountId}`)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    render() {
        // console.log(this.state.isLoggedIn)
        console.log(this.state.discussions)
        const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        // console.log(isMyProfile)
        return (
            <div>
                {/* {this.state.discussions.map(discussion => {
                    return(
                        <div key={discussion._id}>
                            <h2>{discussion.title}</h2>
                            <h4>Discussing: {discussion.book.title} By: {discussion.book.authors}</h4>
                            <p>{discussion.discussionContent}</p>
                            <div>
                                <button><Link to={`/discussinfo/${discussion._id}`}>Details</Link></button>
                                {isMyProfile && <button id={discussion._id} onClick={event => this.deleteDiscussion(event)}>Delete</button>}
                            </div>
                        </div>
                    )
                })} */}
                <div className='container-fluid site-container'>
            {this.state.discussions.length > 0 && 
                <div className='row all-discuss'>
                {this.state.discussions.map(discussion => {
                    return(
                <div key={discussion._id} className='container discussion-container-all'>
                <div className='row discussion-user'>
                <div className='to-left'>
                        <img src={discussion.author?.photo} alt='user-avi' className='usr-avi-timeline' />
                        <p><Link to={`/profile/${discussion.author?._id}`}>{discussion.author?.username}</Link></p>
                </div>
                <div className='to-right'>
                    <button id={discussion._id} className='details-btn'><Link to={`/discussinfo/${discussion._id}`} className='link-white-txt'>Details</Link></button>
                    {isMyProfile && <button className='discussion-dlt-btn' onClick={event => this.deleteDiscussion(event)}>Delete</button>}
                </div>        
                </div>
                <div className='row post-content'>
                        <div className='post-content-left col-sm-3'>
                            <img src={discussion.book?.image_url} alt='book-cvr'/>
                        </div>
                        <div className='post-content-right col-sm-9'>
                        <div>
                            <h3><Link to={`/bookinfo/${discussion.book?.google_books_id}`}>{discussion.book?.title} by {discussion.book?.authors}</Link></h3>
                        </div>
                        <div>
                        
                        </div>
                        <div>
                            <p>{discussion.discussionContent || discussion.content}</p>
                        </div>    

                        </div>
                </div>
                <div className='row thread-link-container'>
                        <Link to={`/discussinfo/${discussion._id}`} className='thread-link'>View thread</Link>
                </div>
                
                </div>
                    )
                })}
                </div>}
                {this.state.discussions.length === 0 && 
                <div className='row'>
                    <h1>This user hasn't written any discussions yet.</h1>
                    <button><Link to={`/profile/${this.props.match.params.accountId}`}>Back to profile</Link></button>
                </div>}
            </div>
            </div>
        )
    }
}
