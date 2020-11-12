import React, { Component } from 'react'
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


    render() {
        return (
            <div>
                {this.state.booksHasRead.length > 0 && 
                <div>
                    <h1>Books user has read</h1>
                    {this.state.booksHasRead.map(book => {
                        return (
                            <div>
                                <h2>{book.title}</h2>
                                <h3>{book.subtitle}</h3>
                                <h4>{book.authors.map(author => author)}</h4>
                                <p>{book.description}</p>
                            </div>
                        )
                    })}
                </div>}
                {this.state.booksWantsToRead.length > 0 && 
                <div>
                    <h1>Books user wants to read</h1>
                    {this.state.booksWantsToRead.map(book => {
                        return(
                            <div>
                                <h2>{book.title}</h2>
                                <h3>{book.subtitle}</h3>
                                <h4>{book.authors.map(author => author)}</h4>
                                <p>{book.description}</p>
                            </div>
                        )
                    })}
                </div>}
            </div>
        )
    }
}
