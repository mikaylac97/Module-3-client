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

    // handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value }); 
    // }

    // handleEditMode = (event) => {
    //     this.setState({
    //         editMode: true
    //     })
    // }

    // saveEditChanges = (event) => {
    //     event.preventDefault();

    //     const { numOfStars, content } = this.state
    //     ACCOUNT_SERVICE
    //         .updateReview(event.target.id, { numOfStars, content })
    //         .then(updatedReview => this.props.history.push(`/reviews/${this.props.user?.user?._id}`))
    //         .catch(err => console.log(err))
    // }

    // deleteReview = () => {

    // }



    render() {
        console.log(this.state.reviews)
        const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        // console.log(this.props?.user?.user?._id)
        // console.log(this.state.isLoggedInUser)
        return (
            <div>
                {this.state.reviews.map(review => {
                    return(
                <div key={review._id}>
                    {!this.state.editMode &&
                        <div>
                        <p>content: {review.content}</p>
                        <p>rating: {review.numOfStars}</p>
                        <p>book reviewing: {review.book?.title}</p>
                        </div>
                    }
                    {isMyProfile &&  
                        <div>
                            <button id={review._id}><Link to={`/reviewinfo/${review._id}`}>Edit</Link></button>
                            <button>Delete</button>
                        </div>
                    }
                        {/* {isMyProfile &&  
                        <div key={review._id}>
                            <form>
                                <label>
                                    Stars / 5
                                    <input type='number' min='0' max='5' name='numOfStars' value={review.numOfStars} onChange={this.handleInputChange}/>
                                </label>
                                <label>
                                    Review
                                    <input type='text' name='content' value={review.content} onChange={this.handleInputChange}/>
                                </label>
                                <button id={review._id} type='submit' onClick={(event) => this.updateReview(event.target.id)}>Save Changes</button>
                            </form>
                        </div>     
                        } */}
                </div>
                    )
                })}
            </div>
        )
    }
}
