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
        // event.preventDefault();
        ACCOUNT_SERVICE
            .postReviewToBook(this.props.match.params.bookId)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() {
        // console.log(this.props.match.params.bookId)
        const { numOfStars, content } = this.state
        return (
            <div>
                <form onSubmit={this.addReviewToBook}>
                    <label>
                        Stars / 5
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
