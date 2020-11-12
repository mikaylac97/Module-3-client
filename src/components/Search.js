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
                // console.log(responseFromDB.data.searchOutput)
                this.setState({
                    searchResult: responseFromDB.data.searchOutput
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.query)
        console.log(this.state.searchResult)
        return (
            <div className='search-container'>
            <form className="form-inline" onChange={this.handleSearch}>
                <input placeholder='Search' className="form-control mr-sm-2" name='query' type='search' autocomplete="off" value={this.state.query} onChange={this.handleInput} />
                <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
            </form>

            {this.state.query.length > 0 && <div className='search-results'>
                {this.state.searchResult.map(searchResult => {
                    return(
                        <div className='single-result'>
                            {/* <img src={searchResult.volumeInfo.imageLinks?.smallThumbnail} alt='book-thumbnail' className='book-thumbnail'/> */}
                            {searchResult.volumeInfo.title}
                        </div>
                    )
                })}
            </div>}
            </div>
        )
    }
}

export default Search;
