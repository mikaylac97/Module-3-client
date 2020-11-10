import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class AccountDetails extends Component {

    state = {
        isLoggedInUser: false,
        userAccountInfo: []
    }

    componentDidMount() {
        this.retreiveUserInfo();
    }

    retreiveUserInfo = () => {
        const { params } = this.props.match;
            ACCOUNT_SERVICE
                .getUserProfile(params.accountId)
                .then(responseFromAPI => {
                    this.setState({
                        userAccountInfo: responseFromAPI.data,
                        isLoggedInUser: responseFromAPI.data.authorized
                    })
                })
    }
    render() {
        console.log(this.state.userAccountInfo)
        return (
            <>
                {this.state.isLoggedInUser && 
                <div>
                    testing 
                </div>
                }
            </>
        )
    }
}
