import React, { Component } from 'react'
import SEARCH_SERVICE from '../services/SearchService'

export class Search extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            searchResult: [],
            query: ''
        }
    }

    
    handleSearch = async (event) => {
        await this.setState({
            query: event.target.value.toLowerCase()
        })
        SEARCH_SERVICE
            .getSearchedBooks(this.state.query)
            .then(q => {
                this.setState({
                    searchResult: q.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.query)
        console.log(this.state.searchResult)
        return (
            <div>
                <input placeholder='Search' name='query' type='text' value={this.state.query} onChange={this.handleSearch}></input>
            </div>
        )
    }
}

export default Search;
