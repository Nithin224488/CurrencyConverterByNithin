import { Component } from 'react'
import { Redirect } from 'react-router'
import {
    MainContainer, Form, Heading, InputContainer, Label, Input, ErrorMsg,
    ResetPassword, LogInContainer, LogIn, StyledLink
} from './styledComponents'


class ForgetPassword extends Component {
    state = {
        userName: '', password: "", confirmPassword: '', userNameError: false, passwordError: false,
        confirmPasswordRequired: false, passwordRequired: false, usernameRequired: false
    }

    onChangeUserName = event => {
        this.setState({ userName: event.target.value })
    }

    onChangePassword = event => {
        this.setState({ password: event.target.value })
    }

    onChangeConfirmPassword = event => {
        this.setState({ confirmPassword: event.target.value })
    }


    onBlurUserName = event => {
        const { userName } = this.state
        if (userName === '') {
            this.setState({ usernameRequired: true })
        } else {
            this.setState({ usernameRequired: false })
        }

    }

    onBlurPassword = event => {
        const { password } = this.state
        if (password === '') {
            this.setState({ passwordRequired: true })
        } else {
            this.setState({ passwordRequired: false })
        }

    }
    onBlurConfirmPassword = event => {
        const { confirmPassword } = this.state
        if (confirmPassword === '') {
            this.setState({ confirmPasswordRequired: true })
        } else {
            this.setState({ confirmPasswordRequired: false })
        }

    }

    submitForm = event => {
        event.preventDefault()
        const { history } = this.props
        const { userName, password, confirmPassword } = this.state
        let userData = JSON.parse(localStorage.getItem('user'))
        if (userData === null) {
            this.setState({ userNameError: true })
        } else {
            let isUsernamePresent = userData.some(data => (data.userName === userName))
            if (!isUsernamePresent) {
                this.setState({ userNameError: true })
            }
            else if (confirmPassword !== password) {
                this.setState({ passwordError: true })
            }
            else if (confirmPassword === password && isUsernamePresent && userName !== "" && confirmPassword !== '' & password !== '') {


                let currentUserDetails = userData.filter(data => (data.userName === userName))

                currentUserDetails = {
                    userName: currentUserDetails[0].userName, fullName: currentUserDetails[0].fullName,
                    emailId: currentUserDetails[0].emailId, password
                }

                let otherUsersDetails = userData.filter(data => (data.userName !== userName))
                userData = [...otherUsersDetails, currentUserDetails]
                localStorage.setItem('user', JSON.stringify(userData))
                history.replace('/login')
            }

        }




    }


    userNameInputContianer = () => {
        const { userNameError, userName, usernameRequired } = this.state
        return (
            <InputContainer>
                <Label htmlFor="username">USERNAME:</Label>
                <Input type="text" onChange={this.onChangeUserName} id="username" placeholder="Username" value={userName} onBlur={this.onBlurUserName} />
                {userNameError && <ErrorMsg>*Username Not Found</ErrorMsg>}
                {usernameRequired && <ErrorMsg>*Required</ErrorMsg>}
            </InputContainer>
        )
    }

    passwordInputContianer = () => {
        const { password, passwordRequired } = this.state
        return (
            <InputContainer>
                <Label htmlFor="password">PASSWORD:</Label>
                <Input type="password" onChange={this.onChangePassword} id="password" placeholder="Password" value={password} onBlur={this.onBlurPassword} />
                {passwordRequired && <ErrorMsg>*Required</ErrorMsg>}
            </InputContainer>
        )
    }

    confirmPasswordInputContianer = () => {
        const { passwordError, confirmPassword, confirmPasswordRequired } = this.state
        return (
            <InputContainer>
                <Label htmlFor="confirmPassword">CONFIRM PASSWORD:</Label>
                <Input type="password" onChange={this.onChangeConfirmPassword} id="confirmPassword"
                    placeholder="Confirm Password" value={confirmPassword} onBlur={this.onBlurConfirmPassword} />
                {confirmPasswordRequired && <ErrorMsg>*Required</ErrorMsg>}
                {passwordError && <ErrorMsg>*Password Doesn't Match </ErrorMsg>}
            </InputContainer>
        )
    }

    render() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser !== null) {
            return <Redirect to='/' />
        }
        return (
            <MainContainer>
                <Form onSubmit={this.submitForm}>
                    <Heading>Currency Converter</Heading>
                    {this.userNameInputContianer()}
                    {this.passwordInputContianer()}
                    {this.confirmPasswordInputContianer()}
                    <ResetPassword type="submit">Reset Password</ResetPassword>
                </Form>
                <LogInContainer>
                    <StyledLink to='/login'><LogIn>Log In</LogIn></StyledLink>
                </LogInContainer>
            </MainContainer>)
    }

}
export default ForgetPassword