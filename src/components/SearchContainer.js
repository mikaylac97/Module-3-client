import React, { Component } from 'react'
import Search from './Search'
import SearchResults from './SearchResults'
import SEARCH_SERVICE from '../services/SearchService'
import { Redirect } from 'react-router-dom'

export default class SearchContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            query: '',
            searchResults: []
        }
    }

    componentDidMount() {
        this.getResults();
    }
    
    onChange = (e) => {
        this.setState({query: e.target.value});
    }

    getResults = () => {
        SEARCH_SERVICE
            .getSearchedBooks(this.state.query.toLowerCase())
            .then(responseFromDB => {
                console.log(responseFromDB.data)
                this.setState({
                    searchResults: responseFromDB.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state)
        return (
            <>
                <form className="form-inline" onSubmit={this.getResults}>
                    <input placeholder='Search' className="form-control mr-sm-2" name='query' type='search' value={this.state.query} onChange={this.onChange} />
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                </form>
                {this.state.searchResults.length > 0 && <Redirect to={{pathname: '/results', state: this.state.searchResults}} />}
            </>
        )
    }
}
