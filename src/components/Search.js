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

    componentDidMount() {
        SEARCH_SERVICE
            .getSearchedBooks(this.state.query)
            .then(responseFromAPI => {
                console.log(responseFromAPI)
                this.setState({ searchResult: responseFromAPI.data })
            })
            .catch(err => console.log(err))
    }
    
    handleSearch = async (event) => {
        await this.setState({
            search: event.target.value.toLowerCase()
        })
        SEARCH_SERVICE
            .getSearchedBooks(this.state.query)
            .then(q => {
                console.log({ query: q.data })
                this.setState({
                    searchResult: q.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.query)
        return (
            <div>
                <input placeholder='Search' type='text' value={this.state.query} onChange={this.handleSearch}></input>
            </div>
        )
    }
}

export default Search
