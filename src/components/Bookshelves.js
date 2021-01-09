import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class Bookshelves extends Component {
    state = {
        isLoggedInUser: false,
        booksHasRead: [],
        booksWantsToRead: [],
        user_id: '',
        username: ''
    }

    componentDidMount() {
        this.getBookshelves();
    }

    getBookshelves = () => {
        const { params } = this.props.match
        ACCOUNT_SERVICE
            .getUserProfile(params.accountId)
            .then(responseFromDB => {
                console.log(responseFromDB.data.user)
                this.setState({
                    booksHasRead: responseFromDB.data.user.hasRead,
                    booksWantsToRead: responseFromDB.data.user.wantToRead,
                    isLoggedInUser: responseFromDB.data.authorized,
                    username: responseFromDB.data.user.username,
                    user_id: responseFromDB.data.user._id 

                })
            })
            .catch(err => console.log(err))
    }

    removeBookFromWantShelf = (event) => {
        // console.log(event)
        ACCOUNT_SERVICE
            .removeBookFromWantToReadList(event.target.id)
            .then(responseFromDB =>  {
                this.props.history.push(`/shelves/${this.props.match.params.accountId}`)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    removeBookFromHasReadShelf = (event) => {
        ACCOUNT_SERVICE
            .removeBookFromHasReadList(event.target.id)
            .then(responseFromDB => {
                this.props.history.push(`/shelves/${this.props.match.params.accountId}`)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }



    render() {
        console.log(this.state.booksHasRead)
        return (
        <div className='container-fluid site-container'>
            <div className='row'>
                {this.state.booksHasRead.length === 0 && this.state.booksWantsToRead.length === 0 && <div className='noshelves'>
                   <h2><Link to={`/profile/${this.state.user_id}`} className='thread-link'>{this.state.username}</Link> has no books in their shelves yet.</h2>
                </div>}
                {this.state.booksHasRead.length > 0 && 
                <div className='col-lg-6'>
                <div className='container'>
                    <h1>Books user has read</h1>
                    <div className='row'>
                    {this.state.booksHasRead.map(book => {
                        return (
                            <div key={book._id}>
                            <img src={book.image_url} alt='book-cvr' className='bookshelf-item'/>
                                {/* <h2>{book.title}</h2>
                                <h3>{book.subtitle}</h3>
                                <h4>{book.authors.map(author => author)}</h4>
                                <p>{book.description}</p> */}
                                <button onClick={event => this.removeBookFromHasReadShelf(event)} className='review-dlt-btn' id={book._id}>Remove Book</button>
                            </div>
                        )
                    })}
                    </div>
                    </div>
                </div>}
                {this.state.booksWantsToRead.length > 0 && 
                <div className='col-lg-6'>
                <div className='container'>
                    <h1>Books user wants to read</h1>
                </div>
                <div className='row'>
                    {this.state.booksWantsToRead.map(book => {
                        return(
                            <div key={book._id}>
                                <img src={book.image_url} className='bookshelf-item' alt='book-cvr' />
                                {/* <button className='hover-btn' onClick={this.removeBookFromWantShelf} id={book._id}>Remove Book</button> */}
                                {/* <img src="https://img.icons8.com/wired/64/000000/trash.png" alt='trash' className='hover-btn' onClick={this.removeBookFromWantShelf} id={book._id}/> */}
                                <button onClick={event => this.removeBookFromWantShelf(event)} id={book._id} className='review-dlt-btn'>Remove Book</button>
                            </div>
                        )
                    })}
                    </div>
                </div>}
                </div>
            </div>
        )
    }
}
