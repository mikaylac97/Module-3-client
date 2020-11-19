import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../../services/UserInfoService'

export default class Discussion extends Component {

    state = {
        title: '',
        content: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmission = (event) => {
        const { bookId } = this.props.match.params
        const { title, content } = this.state
        ACCOUNT_SERVICE
            .startDiscussion(bookId, {title, content})
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
                        <input type='text' name='content' value={this.state.content} onChange={this.handleInputChange}/>
                    </label>
                    <button type='submit'>Start Discussion</button>
                </form>
            </div>
        )
    }
}
