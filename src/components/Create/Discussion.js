import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../../services/UserInfoService'

export default class Discussion extends Component {

    startBookDiscussion = () => {
        ACCOUNT_SERVICE
            .startDiscussion(this.props.match.params.bookId)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.startBookDiscussion}>
                    <label>
                        Title: 
                        <input type='text' name='title'/>
                    </label>
                    <label>
                        Discussion: 
                        <input type='text' name='discussion'/>
                    </label>
                    <button type='submit'>Start Discussion</button>
                </form>
            </div>
        )
    }
}
