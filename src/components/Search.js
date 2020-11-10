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

    
    handleInput = (event) => {
        this.setState({
            query: event.target.value
        })
    }


    handleSearch = () => {
       SEARCH_SERVICE
            .getSearchedBooks(this.state.query.toLowerCase())
            .then(responseFromDB => {
                this.setState({
                    searchResult: responseFromDB.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.query)
        console.log(this.state.searchResult)
        return (
            <form className="form-inline" onChange={this.handleSearch}>
                <input placeholder='Search' className="form-control mr-sm-2" name='query' type='search' value={this.state.query} onChange={this.handleInput} />
                <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
            </form>
        )
    }
}

export default Search;
