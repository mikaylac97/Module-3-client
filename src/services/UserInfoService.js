import axios from 'axios'
const baseURL = process.env.REACT_APP_DOMAINURL
// const baseURL = 'https://boookr.herokuapp.com'

const service = axios.create({
    baseURL,
    // withCredentials: true
});

const ACCOUNT_SERVICE = {
    service,

    getUserProfile(accountId) {
        return service.get(`/api/account/${accountId}`)
    },

    getTimeline(){
        return service.get('/api/posts')
    },

    editAccountDetails() {
        return service.post(`/api/account/edit`)
    },

    deleteAccount() {
        return service.post(`/api/delete-account`)
    },

    getUsersShelves(accountId) {
        return service.get(`/api/shelves/${accountId}`)
    },
    
    getUsersHasRead(accountId) {
        return service.get(`/api/has-read/${accountId}`)
    },

    getUsersWantToRead(accountId) {
        return service.get(`/api/want-to-read/${accountId}`)
    },

    addBookToHasReadList(bookId) {
        return service.post(`/api/add-to-has-read/${bookId}`)
    },

    addBookToWantToReadList(bookId) {
        return service.post(`/api/add-to-want-to-read/${bookId}`)
    },

    removeBookFromWantToReadList(bookId) {
        return service.post(`/api/remove-want-book/${bookId}`)
    },

    removeBookFromHasReadList(bookId) {
        return service.post(`/api/remove-has-book/${bookId}`)
    },

    getUsersReviews(userId) {
        return service.get(`/api/reviews/${userId}`)
    },

    postReviewToBook(bookId) {
        return service.post(`/api/review/${bookId}`)
    }

}

export default ACCOUNT_SERVICE;