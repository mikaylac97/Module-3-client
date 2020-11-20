import axios from 'axios'
const baseURL = process.env.REACT_APP_DOMAINURL
// const baseURL = 'https://boookr.herokuapp.com'

const service = axios.create({
    baseURL,
    withCredentials: true
});

// const image_service = axios.create({
//     baseURL,
//     withCredentials: true,
//     headers: { "Content-Type": "multipart/form-data" }
// });


const ACCOUNT_SERVICE = {
    service,

    getUserProfile(accountId) {
        return service.get(`/api/account/${accountId}`)
    },

    getTimeline(){
        return service.get('/api/posts')
    },

    editAccountDetails(newAccountDetails) {
        return service.post(`/api/account/edit`, newAccountDetails)
    },

    deleteAccount() {
        return service.post(`/api/delete-account`, {})
    },

    followAndUnfollow(accountId) {
        return service.post(`/api/follow/${accountId}`, {})
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
        return service.post(`/api/add-to-has-read/${bookId}`, {})
    },

    addBookToWantToReadList(bookId) {
        return service.post(`/api/add-to-want-to-read/${bookId}`, {})
    },

    removeBookFromWantToReadList(bookId) {
        return service.post(`/api/remove-want-book/${bookId}`, {}) 
    },

    removeBookFromHasReadList(bookId) {
        return service.post(`/api/remove-has-book/${bookId}`, {})
    },

    getUsersReviews(userId) {
        return service.get(`/api/reviews/${userId}`)
    },

    postReviewToBook(bookId, newReview) {
        return service.post(`/api/review/${bookId}`, newReview)
    },

    viewSingleReview(reviewId){
        return service.get(`/api/review/${reviewId}`)
    },

    updateReview(reviewId, editedReview){
        return service.post(`/api/review/edit/${reviewId}`, editedReview)
    },

    deleteReview(reviewId){
        return service.post(`/api/review/delete/${reviewId}`, {})
    },

    startDiscussion(bookId, discussion) {
        return service.post(`/api/start-discussion/${bookId}`, discussion)
    },

    viewSingleDiscussion(discussionId){
        return service.get(`/api/discuss/${discussionId}`)
    },

    updateDiscussion(discussionId, editedDiscussion){
        return service.post(`/api/discuss/edit/${discussionId}`, editedDiscussion)
    },

    deleteDiscussion(discussionId){
        return service.post(`/api/delete-discuss/${discussionId}`, {})
    }

}

export default ACCOUNT_SERVICE;