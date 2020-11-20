import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class DiscussionDetails extends Component {
    state = {
        discussion: [],
        title: '',
        content: '',
        editMode: false
    }

    componentDidMount() {
        this.getSingleDiscussion();
    }

    getSingleDiscussion = () => {
        ACCOUNT_SERVICE
            .viewSingleDiscussion(this.props.match.params.discussionId)
            .then(discussionFromDB => {
                this.setState({
                    discussion: discussionFromDB.data.singleDiscussion,
                    title: discussionFromDB.data.singleDiscussion.title,
                    content: discussionFromDB.data.singleDiscussion.content,
                    editMode: false
                })
            })
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
