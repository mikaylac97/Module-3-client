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
                        userAccountInfo: responseFromAPI.data.user,
                        isLoggedInUser: responseFromAPI.data.authorized
                    })
                })
    }
    render() {
        return (
            <>
                {this.state.isLoggedInUser && 
                <div>
                <form>
                    <label>
                        Email Address
                        <input type='email' placeholder={`${this.state.userAccountInfo.email}`}/>
                    </label>
                    {/* <label>
                        First Name
                        <input type='text' placeholder={`${this.state.userAccountInfo.email}`}/>
                    </label> */}
                    <label>
                        User Name
                        <input type='text' placeholder={`${this.state.userAccountInfo.username}`}/>
                    </label>
                    <label>
                        Bio
                        <input type='text' placeholder={`${this.state.userAccountInfo.bio}`}/>
                    </label>
                    <button>Save Profile Settings</button>
                </form>
                </div>
                }
            </>
        )
    }
}
