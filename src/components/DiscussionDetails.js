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
            .then(updateDiscussion => this.props.history.push(`/discussions/${this.props.user?.user?._id}`))
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
            .then(updatedDiscussionWithReply => this.props.history.push(`/discussinfo/${discussionId}`))
            .catch(err => console.log(err))
    }



    render() {
       const { discussion } = this.state;
       console.log(discussion)
       const isMyProfile = this.props?.user?.user?._id.toString() === discussion.author?._id
        return (

            <div key={discussion._id} className='timeline-item container'>
                <div className='usr-info-timeline row'>
                    <img src={discussion.author?.photo} alt='user' className='usr-avi-timeline' />
                    <Link to={`/profile/${discussion.author?._id}`}>{discussion.author?.username}</Link>
                </div>
                <div className='post-content row'>
                    <div className='post-book-img col-md-3'>
                        <img src={discussion.book?.image_url} alt='book-cvr' />
                    </div>
                    <div className='post-text-content col-md-9'>
                        <h4>{discussion.book?.title} by: {discussion.book?.authors}</h4>
                        <h5>{discussion.title}</h5>
                        <p>{discussion.discussionContent}</p>
                    </div>
                </div>
            </div>
            // <div className='container page-container timeline-item'>
            //     <div>
            //         <div className='usr-info-timeline row'>
            //             <img src={discussion.author?.photo} alt='user-avi' className='usr-avi-timeline' />
            //             <p>{discussion.author?.username}</p>
            //             {isMyProfile && !this.state.editMode && <div>
            //             <button onClick={this.handleEditMode} className='edit-btn'>Edit discussion</button>
            //             <button onClick={event => this.deleteDiscussion(event)} className='dlt-btn'>Delete discussion</button>
            //         </div>}
            //         </div>
            //     </div>
            //     <div className='post-content row'>
            //         <div className='post-book-img col-md-3'>
            //             <img src={discussion.book?.image_url} alt='book-cover' className='book-cover-timeline' />
            //         </div>
            //         <div className='post-text-content col-md-9'>
            //             <h3>{discussion.book?.title}</h3>
            //             <h4>{discussion.book?.subtitle}</h4>
            //             <p>Written by: {discussion.book?.authors}</p>
            //             <h3>{discussion.title}</h3>
            //             <p>{discussion.discussionContent}</p>
            //         </div>
            //     </div>
            //     {!this.state.editMode && <div>
            //         {discussion.replies?.length > 0 && <div>
            //             {discussion.replies.map(reply => {
            //                 return(
            //                     <>
            //                     <div>
            //                         <p>Replies</p>
            //                         <img src={reply.author.photo} alt='user-avi' className='usr-avi-timeline'/>
            //                         <p>{reply.author.username}</p>
            //                     </div>
            //                     <div>
            //                         <p>{reply.replyContent}</p>
            //                         {/* {reply.author._id === this.props?.user?.user?._id && <button>delete comment</button>} */}
            //                     </div>
            //                     </>
            //                 )
            //             })}
            //         </div>}
            //         <div>
            //             <form onSubmit={this.replyToDiscussion}>
            //                     <textarea name="replyContent" value={this.state.replyContent} placeholder={`Reply to ${discussion.author?.username}'s discussion`} cols="70" rows="1" onChange={this.handleInputChange} /> 
            //                     <button type='submit'>Reply</button>
            //             </form>
            //         </div>
            //     </div>}
            //     {isMyProfile && this.state.editMode &&
            //         <div key={discussion._id}>
            //                 <form onSubmit={(event) => this.saveEditChanges(event)} className='bookr-form'>
            //                     <label>
            //                         Title
            //                         <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange}/>
            //                     </label>
            //                     <label>
            //                         Content
            //                         <input type='text' name='discussionContent' value={this.state.discussionContent} onChange={this.handleInputChange}/>
            //                     </label>
            //                     <button id={discussion._id} type='submit'>Save Changes</button>
            //                 </form>
            //             </div> 
            //     }
            // </div>
        )
    }
}
