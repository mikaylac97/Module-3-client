import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class DiscussionDetails extends Component {
    state = {
        discussion: [],
        title: '',
        discussionContent: '',
        replyContent: '',
        editMode: false
    }

    componentDidMount() {
        this.getSingleDiscussion();
    }

    getSingleDiscussion = () => {
        ACCOUNT_SERVICE
            .viewSingleDiscussion(this.props.match.params.discussionId)
            .then(discussionFromDB => {
                // console.log(discussionFromDB.data.singleDiscussion)
                this.setState({
                    discussion: discussionFromDB.data.singleDiscussion,
                    title: discussionFromDB.data.singleDiscussion.title,
                    discussionContent: discussionFromDB.data.singleDiscussion.discussionContent,
                    editMode: false
                })
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }); 
    }

    handleEditMode = (event) => {
        this.setState({
            editMode: true
        })
    }

    saveEditChanges = (event) => {
        event.preventDefault();

        const { title, discussionContent } = this.state
        const { discussionId } = this.props.match.params

        ACCOUNT_SERVICE
            .updateDiscussion(discussionId, { title, discussionContent })
            .then(updateDiscussion => this.props.history.push(`/discussinfo/${discussionId}`))
            .catch(err => console.log(err))
    }

    deleteDiscussion = (event) => {
        event.preventDefault();

        const { discussionId } = this.props.match.params

        ACCOUNT_SERVICE
            .deleteDiscussion(discussionId)
            .then(deletedDiscussion => this.props.history.push(`/discussions/${this.props.user?.user?._id}`))
            .catch(err => console.log(err))
    }

    replyToDiscussion = (event) => {
        event.preventDefault();

        const { discussionId } = this.props.match.params;
        const { replyContent } = this.state;
        ACCOUNT_SERVICE
            .replyToDiscussion(discussionId, { replyContent })
            .then(updatedDiscussionWithReply => {
                console.log(updatedDiscussionWithReply)
                this.setState({
                    discussion: updatedDiscussionWithReply.data.updatedDiscussion
                })
            })
            .catch(err => console.log(err))
    }

// work on this later

    render() {
       const { discussion } = this.state;
       console.log(discussion)
       const isMyProfile = this.props?.user?.user?._id.toString() === discussion.author?._id
        return (

            <div key={discussion._id} className='container-fluid site-container'>
            <div className='row'>
            <div className='post-container container'>
                <div className='review-user row'>
                <div className='to-left'>
                    <img src={discussion.author?.photo} alt='user' className='usr-avi-timeline' />
                    <Link to={`/profile/${discussion.author?._id}`}>{discussion.author?.username}</Link>
                </div>
                {isMyProfile && !this.state.editMode && <div className='to-right'>
                        <button onClick={this.handleEditMode} className='edit-btn'>Edit discussion</button>
                        <button onClick={event => this.deleteDiscussion(event)} className='dlt-btn'>Delete discussion</button>
                    </div>}
                </div>

                <div className='post-content row'>
                    <div className='post-book-img col-md-3'>
                        <img src={discussion.book?.image_url} alt='book-cvr' />
                    </div>
                    {!this.state.editMode && <div className='post-text-content col-md-9'>
                        <h4>{discussion.book?.title} by: {discussion.book?.authors}</h4>
                        <h5>{discussion.title}</h5>
                        <p>{discussion.discussionContent || discussion.content}</p>
                    </div>}
                    {isMyProfile && this.state.editMode && <div>
                        <form onSubmit={event => this.saveEditChanges(event)} className='bookr-form'>
                            <label>
                                Title: 
                                <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange}/>
                            </label>
                            <label>
                                Discussion: 
                                <input type='text' name='discussionContent' value={this.state.discussionContent} onChange={this.handleInputChange}/>
                            </label>
                            <button type='submit'>Save Changes</button>
                        </form>
                    </div>}
                </div>
                <div className='replies-container row'>
                    {discussion.replies?.length > 0 && 
                    <>
                        {discussion.replies.map(reply => {
                            return(
                                <div className='single-reply container'>
                                    <div className='row reply-user-info'>
                                        <img src={reply.author?.photo} className='user-avi-side' alt='user-avi'/>
                                        <p><Link to={`/profile/${reply.author?._id}`} className='thread-link'>{reply.author?.username}</Link></p>
                                    </div>
                                    <div className='row reply-content'>
                                     <p>{reply.replyContent}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </>}
                                    <div className='add-reply-container row'>
                                        <img src={this.props.user?.user?.photo} alt='user-avi' className='user-avi-side' />
                                        <form className='reply-form' onSubmit={event => this.replyToDiscussion(event)}>
                                            <input type='text' name='replyContent' value={this.state.replyContent} placeholder='Leave a comment' onChange={this.handleInputChange} />
                                            <button type='submit' className='reply-btn'>Reply</button>
                                        </form>
                                    </div> 
                </div>
                </div>
                </div>
            </div>
        )
    }
}
