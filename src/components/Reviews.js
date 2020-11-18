import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Reviews extends Component {
    state = {
        // isLoggedInUser: false,
        reviews: []
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


    render() {
        console.log(this.state.reviews)

        // console.log(this.props?.user?.user?._id)
        // console.log(this.state.isLoggedInUser)
        return (
            <div>
                {this.state.reviews.map(review => {
                    return(
                    <div key={review._id}>
                        <p>content: {review.content}</p>
                        <p>rating: {review.numOfStars}</p>
                        <p>book reviewing: {review.book?.title}</p>
                    </div>
                    )
                })}
            </div>
        )
    }
}
