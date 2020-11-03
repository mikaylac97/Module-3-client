import axios from 'axios'

const service = axios.create({
    baseURL: `https://www.googleapis.com/books/v1/volumes`
});

const SEARCH_SERVICE = {
    service,

    getSearchedBooks(query) {
        return service.get(`?q=${query}`)
    }
}

export default SEARCH_SERVICE;