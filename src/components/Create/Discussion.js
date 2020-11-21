import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../../services/UserInfoService'

export default class Discussion extends Component {

    state = {
        title: '',
        discussionContent: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmission = (event) => {
        event.preventDefault();
        const { bookId } = this.props.match.params
        const { title, discussionContent } = this.state
        ACCOUNT_SERVICE
            .startDiscussion(bookId, {title, discussionContent})
            .then(response => {this.props.history.push(`/discussions/${this.props.user?.user?._id}`)})
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='container page-container'>
                <form onSubmit={this.handleSubmission} className='bookr-form'>
                    <label>
                        Title: 
                        <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Discussion: 
                        <input type='text' name='discussionContent' value={this.state.discussionContent} onChange={this.handleInputChange}/>
                    </label>
                    <button type='submit'>Start Discussion</button>
                </form>
            </div>
        )
    }
}
