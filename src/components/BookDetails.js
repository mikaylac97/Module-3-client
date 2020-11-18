import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SEARCH_SERVICE from '../services/SearchService'

export default class BookDetails extends Component {
    state = {
        book: []
    }

    componentDidMount(){
        this.getDetails();
    }

    getDetails = () => {
        SEARCH_SERVICE
            .getBookDetails(this.props.match.params.bookId)
            .then(bookFromDB => {
                // console.log(bookFromDB.data)
                this.setState({
                    book: bookFromDB.data
                })
            })
    }
    render() {
        console.log(this.state.book)
        const { book } = this.state
        return (
            <div>
                <img src={book.image_url} alt='book-cover' />
                <button>
                    <Link to={`/review/${book._id}`}>
                    Write a Review
                    </Link>
                </button>
                <button>
                    <Link to={`/discuss/${book._id}`}>
                    Start a Discussion
                    </Link>
                </button>
                    <h1>{book.title}</h1>
                    <h3>{book.subtitle}</h3>
                    <p>by: {book.authors}</p>
                    <p>{book.description}</p>
            </div>
        )
    }
}
