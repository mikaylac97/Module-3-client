import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class ReviewDetails extends Component {
    state = {
        review: [],
        numOfStars: 0,
        content: '',
        editMode: false
    }

    componentDidMount() {
        this.getSingleReview();
    }

    getSingleReview = () => {
        ACCOUNT_SERVICE
            .viewSingleReview(this.props.match.params.reviewId)
            .then(reviewFromDB => this.setState({ review: reviewFromDB.data.singleReview, numOfStars: reviewFromDB.data.singleReview.numOfStars, content: reviewFromDB.data.singleReview.content }))
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

        const { numOfStars, content } = this.state
        const { reviewId } = this.props.match.params

        ACCOUNT_SERVICE
            .updateReview(reviewId, { numOfStars, content })
            .then(updatedReview => this.props.history.push(`/reviews/${this.props.user?.user?._id}`))
            .catch(err => console.log(err))
    }

    deleteReview = (event) => {
        event.preventDefault();

        const { reviewId } = this.props.match.params

        ACCOUNT_SERVICE
            .deleteReview(reviewId)
            .then(deletedReview => this.props.history.push(`/reviews/${this.props.user?.user?._id}`))
            .catch(err => console.log(err))
    }

    render() {
        const { review } = this.state
        const isMyProfile = this.props?.user?.user?._id.toString() === review.author?._id
        console.log(review)
        return (
            <div className='f5backgroundcolor container-fluid'>
            <div className='row'>
            <div className='container details-container'>
                <div className='row review-user'>
                    <div className='usr-info-timeline to-left'>
                        <img src={review.author?.photo} alt='user-avi' className='usr-avi-timeline' />
                        <Link to={`/profile/${review.author?._id}`}>{review.author?.username}</Link>
                    </div>
                    {isMyProfile && !this.state.editMode && <div className='to-right'>
                        <button className='details-btn' onClick={this.handleEditMode}>Edit Review</button>
                        <button className='review-dlt-btn' onClick={event => this.deleteReview(event)}>Delete Review</button>
                    </div>}
                </div>
                <div className='row book-info'>
                    <div>
                        <img src={review.book?.image_url} alt='book-cover' className='book-cover' />
                    </div>
                    <div>
                        <Link to={`/bookinfo/${review.book?.google_books_id}`} className='thread-link'><h3>{review.book?.title}</h3></Link>
                        <h4>{review.book?.subtitle}</h4>
                        <p>Written by: {review.book?.authors}</p>
                    </div>
                </div>
                {isMyProfile && !this.state.editMode && 
                <>
                <div className='row'>
                    <p>User Rating: {review?.numOfStars} / 5</p>
                </div>
                <div className='row'>
                    <p>{review?.content}</p>
                </div>
                </>}
                {isMyProfile && this.state.editMode &&
                    <div key={review._id}>
                            <form onSubmit={(event) => this.saveEditChanges(event)}>
                                <label>
                                    Stars / 5
                                    <input type='number' min='0' max='5' name='numOfStars' value={this.state.numOfStars} onChange={this.handleInputChange}/>
                                </label>
                                <label>
                                    Review
                                    <textarea rows="4" cols="50" type='text' name='content' value={this.state.content} onChange={this.handleInputChange}/>
                                </label>
                                <button id={review._id} type='submit'>Save Changes</button>
                            </form>
                        </div> 
                }
                </div>
            </div>
        </div>
        )
    }
}
