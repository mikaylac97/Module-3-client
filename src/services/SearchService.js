import axios from 'axios'
const baseURL = process.env.REACT_APP_DOMAINURL
// const baseURL = 'https://boookr.herokuapp.com'

const service = axios.create({
    baseURL,
    withCredentials: true
});

const SEARCH_SERVICE = {
    service,

    getSearchedBooks(query) {
        return service.post(`/api/book-search?q=${query}`)
    },
    getBookDetails(bookId){
        return service.get(`/api/details/${bookId}`)
    }
}

export default SEARCH_SERVICE;