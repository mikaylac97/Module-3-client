import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Reviews extends Component {
    state = {
        isLoggedInUser: false,
        reviews: []
    }

    componentDidMount(){
        this.getUserReviews();
    }

    getUserReviews = () => {
        ACCOUNT_SERVICE
            .getUsersReviews(this.props.match.params.accountId)
            .then(reviewsFromDB => {
                this.setState({
                    isLoggedInUser: reviewsFromDB.data.authorized,
                    reviews: reviewsFromDB.data.reviews
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state.reviews)
        console.log(this.state.isLoggedInUser)
        return (
            <div>
                
            </div>
        )
    }
}
