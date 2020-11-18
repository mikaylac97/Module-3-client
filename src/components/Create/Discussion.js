import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../../services/UserInfoService'

export default class Discussion extends Component {

    state = {
        title: '',
        discussion: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmission = () => {
        const { bookId } = this.props.match.params
        const { title, discussion } = this.state
        ACCOUNT_SERVICE
            .startDiscussion(bookId)
            .then(response => this.props.history.push(`/discussions/${this.props.user?.user?._id}`))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmission}>
                    <label>
                        Title: 
                        <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Discussion: 
                        <input type='text' name='discussion' value={this.state.discussion} onChange={this.handleInputChange}/>
                    </label>
                    <button type='submit'>Start Discussion</button>
                </form>
            </div>
        )
    }
}
