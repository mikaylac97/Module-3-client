import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../../services/UserInfoService'

export default class Review extends Component {

    state = {
        numOfStars: 0,
        content: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    addReviewToBook = (event) => {
        event.preventDefault();
        const { numOfStars, content } = this.state
        const { bookId } = this.props.match.params
        // const { userId } = this.props.user?.user?._id
        // console.log(bookId, {numOfStars, content})
        ACCOUNT_SERVICE
        .postReviewToBook(bookId, {numOfStars, content})
        .then(response => {
            console.log({reviewProps: this.props.user?.user?._id})
                
                this.props.history.push(`/reviews/${this.props.user?.user?._id}`)
            })
            .catch(err => console.log(err))
    }

    render() {
        // console.log(this.props.match.params.bookId)
        const { numOfStars, content } = this.state
        // console.log({numOfStars, content})
        return (
            <div className='container page-container'>
                <form onSubmit={this.addReviewToBook} className='bookr-form'>
                    <label>
                        Rating / 5
                        <input type='number' min='0' max='5' name='numOfStars' value={numOfStars} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Review
                        <input type='text' name='content' value={content} onChange={this.handleInputChange}/>
                    </label>
                    <button type='submit'>Post Review</button>
                </form>
            </div>
        )
    }
}
