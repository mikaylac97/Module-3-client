import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SEARCH_SERVICE from '../services/SearchService'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class BookDetails extends Component {
    state = {
        book: [],
        paramId: ''
    }

    componentDidMount(){
        this.getDetails();
    }

    getDetails = () => {
        console.log({
            state: this.state.paramId,
            params: this.props.match.params.bookId
        })
        
            SEARCH_SERVICE
                .getBookDetails(this.props.match.params.bookId)
                .then(bookFromDB => {
                    console.log(bookFromDB.data)
                    this.setState({
                        book: bookFromDB.data,
                        paramId: this.props.match.params.bookId
                    })
                })
        
    }

    addToHasRead = (event) => {
        event.preventDefault();
        ACCOUNT_SERVICE
            .addBookToHasReadList(this.state.book._id)
            .then(addedBook => {
                console.log({ book: addedBook })
                this.props.history.push(`/shelves/${this.props?.user?.user?._id}`)
            })
            .catch(err => console.log(err))
    }

    addToWantToRead = (event) => {
        event.preventDefault();
        ACCOUNT_SERVICE
        .addBookToWantToReadList(this.state.book._id)
        .then(addedBook => {
            this.props.history.push(`/shelves/${this.props?.user?.user?._id}`)
        })
        .catch(err => console.log(err))
    }

   
    render() {
        console.log(this.state.book)
        const { book } = this.state
        if(this.state.paramId !== this.props.match.params.bookId){ this.getDetails() }
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-3'>
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
                <button onClick={event => this.addToWantToRead(event)}>Add to want to read shelf</button>
                <button onClick={event => this.addToHasRead(event)}>Add to has read shelf</button>
                    </div>
                    <div className='col-lg-9'>
                    <h1>{book.title}</h1>
                    <h3>{book.subtitle}</h3>
                    <p>by: {book.authors}</p>
                    <p>{book.description}</p>
                    </div>
                </div>
                <div className='row'>
                    <div>
                        {/* <h2>Reviews</h2> */}
                        {/* {book.reviews.map(review => {
                            return(
                                <p>{review._id}</p>
                            )
                        })} */}
                    </div>
                </div>
                {/* <img src={book.image_url} alt='book-cover' />
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
                <button onClick={event => this.addToWantToRead(event)}>Add to want to read shelf</button>
                <button onClick={event => this.addToHasRead(event)}>Add to has read shelf</button>
                    <h1>{book.title}</h1>
                    <h3>{book.subtitle}</h3>
                    <p>by: {book.authors}</p>
                    <p>{book.description}</p> */}
            </div>
        )
    }
}
