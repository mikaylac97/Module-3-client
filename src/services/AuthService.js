import axios from 'axios'
const baseURL = 'https://boookr.herokuapp.com'

const service = axios.create({
    baseURL,
    withCredentials: true
});

const AUTH_SERVICE = {
    signup(userData) {
        console.log(baseURL)
        return service.post('/api/signup', userData)
    },
    login(userData) {
        return service.post('/api/login', userData)
    },
    logout() {
        return service.post('/api/logout', {})
    },
    getAuthenticatedUser() {
        return service.get('/api/isLoggedIn')
    }
}

export default AUTH_SERVICE;