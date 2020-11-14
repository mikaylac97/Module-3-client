import axios from 'axios'
const baseURL = 'https://boookr.herokuapp.com/'

const service = axios.create({
    baseURL,
    withCredentials: true
});

const SEARCH_SERVICE = {
    service,

    getSearchedBooks(query) {
        return service.post(`/api/book-search?q=${query}`)
    }
}

export default SEARCH_SERVICE;