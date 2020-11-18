import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class AccountDetails extends Component {

    state = {
        // isLoggedInUser: false,
        userAccountInfo: []
    }

    componentDidMount() {
        this.retreiveUserInfo();
    }

    retreiveUserInfo = () => {
        // const { params } = this.props.match;
            ACCOUNT_SERVICE
                .getUserProfile(this.props?.user?.user?._id)
                .then(responseFromAPI => {
                    // console.log(responseFromAPI.data.user)
                    this.setState({
                        userAccountInfo: responseFromAPI.data.user
                        // isLoggedInUser: responseFromAPI.data.authorized
                    })
                })
    }

    handleSubmission = () => {

        ACCOUNT_SERVICE
            .editAccountDetails()
            .then(editedUser => console.log(editedUser))
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state.userAccountInfo)
        const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        return (
            <>
                {isMyProfile && 
                <div>
                <form onSubmit={this.handleSubmission}>
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
                    {/* <label>
                        Bio
                        <input type='text' placeholder={`${this.state.userAccountInfo.bio}`}/>
                    </label> */}
                    <label>
                        Input password to change details
                        <input type='password' placeholder='*******' autoComplete='off'/>
                    </label>
                    <button type='submit'>Save Profile Settings</button>
                </form>
                </div>
                }
            </>
        )
    }
}
