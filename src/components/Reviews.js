import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Reviews extends Component {
    state = {
        // isLoggedInUser: false,
        reviews: []
        // editMode: false

    }

    componentDidMount(){
        this.getUserReviews();
    }

    getUserReviews = () => {
        ACCOUNT_SERVICE
            .getUsersReviews(this.props.match.params.accountId)
            .then(reviewsFromDB => {
                // console.log(reviewsFromDB)
                this.setState({
                    // isLoggedInUser: reviewsFromDB.data.authorized,
                    reviews: reviewsFromDB.data.reviews
                })
            })
            .catch(err => console.log(err))
    }

    deleteReview = (event) => {
        event.preventDefault();

        ACCOUNT_SERVICE
            .deleteReview(event.target.id)
            .then(deletedReview =>  {
                this.props.history.push(`/reviews/${this.props.match.params.accountId}`)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    



    render() {
        console.log(this.state.reviews)
        const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        // console.log(this.props?.user?.user?._id)
        // console.log(this.state.isLoggedInUser)
        return (
            <div className='container-fluid site-container'>
            {this.state.reviews.length > 0 && 
                <div className='row'>
                {this.state.reviews.map(review => {
                    return(
                <div key={review._id} className='container review-container-all'>
                <div className='row review-user'>
                <div className='to-left'>
                        <img src={review.author?.photo} alt='user-avi' className='usr-avi-timeline' />
                        <p><Link to={`/profile/${review.author?._id}`}>{review.author?.username}</Link></p>
                </div>
                <div className='to-right'>
                    <button id={review._id} className='details-btn'><Link to={`/reviewinfo/${review._id}`} className='link-white-txt'>Details</Link></button>
                    {isMyProfile && <button id={review._id} onClick={event => this.deleteReview(event)} className='review-dlt-btn'>Delete</button>}
                </div>        
                </div>
                <div className='row post-content'>
                        <div className='post-content-left col-sm-3'>
                            <img src={review.book?.image_url} alt='book-cvr'/>
                        </div>
                        <div className='post-content-right col-sm-9'>
                        <div>
                            <h3><Link to={`/bookinfo/${review.book?.google_books_id}`}>{review.book?.title} by {review.book?.authors}</Link></h3>
                        </div>
                        <div>
                        {review.numOfStars === 1 && <p>★☆☆☆☆</p>}
                            {review.numOfStars === 2 && <p>★★☆☆☆</p>}
                            {review.numOfStars === 3 && <p>★★★☆☆</p>}
                            {review.numOfStars === 4 && <p>★★★★☆</p>}
                            {review.numOfStars === 5 && <p>★★★★★</p>}
                        </div>
                        <div>
                            <p>{review.content}</p>
                        </div>    

                        </div>
                </div>
                
                </div>
                    )
                })}
                </div>}
                {this.state.reviews.length === 0 && 
                <div className='row'>
                    <h1>This user hasn't written any reviews yet.</h1>
                    <button><Link to={`/profile/${this.props.match.params.accountId}`}>Back to profile</Link></button>
                </div>}
            </div>
        )
    }
}
