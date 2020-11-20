import React, { Component } from 'react'
import ACCOUNT_SERVICE from '../services/UserInfoService'

export default class AccountDetails extends Component {

    state = {
        // isLoggedInUser: false,
        userAccountInfo: [],
        email: this.props.user?.user?.email,
        bio: this.props.user?.user?.bio,
        username: this.props.user?.user?.username,
        photo: this.props.user?.user?.photo,
        password: this.props.user?.user?.passwordHash

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

    handleInputChange = (event) => {
        console.log(event.target)
        const { name, value } = event.target;
        this.setState({ [name]: value });
       
    }

    handleImageChange = (event) => {
        console.log(event.target)
        const { files } = event.target;

        this.setState({ photo: files[0] });
    };

    handleSubmission = (event) => {
        event.preventDefault();

        const { email, bio, username, password, photo } = this.state
        const uploadData = new FormData();

        console.log(this.state)

        uploadData.append("photo", photo);
        uploadData.append("email", email);
        uploadData.append("username", username);
        uploadData.append("bio", bio);
        uploadData.append("password", password);

        
        ACCOUNT_SERVICE
            .editAccountDetails(uploadData)
            .then(editedUser => {
                // this.fileInput.value='';
                this.props.onUserChange(editedUser)
            })
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state.photo)
        console.log(this.state.password)
        const isMyProfile = this.props?.user?.user?._id.toString() === this.props.match.params.accountId.toString();
        return (
            <>
                {isMyProfile && 
                <div>
                <form onSubmit={(event) => this.handleSubmission(event)}>
                    <label>
                        Change profile picture
                        <input type='file' name='photo' onChange={(event) => this.handleImageChange(event)} />
                    </label>
                    <label>
                        Email Address
                        <input type='email' name='email' onChange={this.handleInputChange} value={this.state.email} placeholder={`${this.state.email}`}/>
                    </label>
                    {/* <label>
                        First Name
                        <input type='text' placeholder={`${this.state.userAccountInfo.email}`}/>
                    </label> */}
                    <label>
                        User Name
                        <input type='text' name='username' onChange={this.handleInputChange} value={this.state.username} placeholder={`${this.state.username}`}/>
                    </label>
                    <label>
                        Bio
                        <input type='text' name='bio' onChange={this.handleInputChange} value={this.state.bio} placeholder={`${this.state.bio}`}/>
                    </label>
                    <label>
                        Input password to change details
                        <input type='password' placeholder='*******' name='password' value={this.state.password} autoComplete='off' onChange={this.handleInputChange}/>
                    </label>
                    <button type='submit'>Save Profile Settings</button>
                </form>
                </div>
                }
            </>
        )
    }
}
