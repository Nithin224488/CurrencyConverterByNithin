import { Component } from 'react'
import { Redirect } from 'react-router'

import {
    MainContainer, Form, Heading, InputContainer, Label, Input, ErrorMsg,
    SignUpButton, LogInContainer,
    LogInQuestion, StyledLink, LogIn
} from './styledComponents'

class RegisterForm extends Component {
    state = {
        userName: '', password: '', emailId: '', fullName: '', isUserNameAlreadyUsed: false, isMailIdAlreadyUsed: false,
        passwordError: false, confirmPassword: '', emailRequired: false, fullNameRequired: false, passwordRequired: false,
        UsernameRequired: false, confirmPasswordRequired: false
    }

    onChangeUserName = event => {
        this.setState({ userName: event.target.value })
    }

    onChangePassword = event => {
        this.setState({ password: event.target.value })
    }
    onChangeMailId = event => {
        this.setState({ emailId: event.target.value })
    }

    onChangeFullName = event => {
        this.setState({ fullName: event.target.value })
    }
    onChangeConfirmPassword = event => {
        this.setState({ confirmPassword: event.target.value })
    }
    onBlurEmail = event => {
        const { emailId } = this.state
        if (emailId === '') {
            this.setState({ emailRequired: true })
        } else {
            this.setState({ emailRequired: false })
        }

    }

    onBlurFullname = event => {
        const { fullName } = this.state
        if (fullName === '') {
            this.setState({ fullNameRequired: true })
        } else {
            this.setState({ fullNameRequired: false })
        }

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
        const { fullName, emailId, userName, password, confirmPassword } = this.state
        const userDetails = { fullName, emailId, userName, password }
        let userData = JSON.parse(localStorage.getItem('user'))
        let isUserNameAlreadyUsed = false
        let isMailIdAlreadyUsed = false
        let isEmpty=fullName !== '' && emailId !== '' && userName !== '' && password !== '' && confirmPassword !== ""
        const { history } = this.props
        console.log("1")
        console.log(isEmpty)
        if (userData === null && isEmpty) {
            userData = [userDetails]
            history.replace('/')
            localStorage.setItem('currentUser', JSON.stringify(userDetails))

            localStorage.setItem('user', JSON.stringify(userData))
        }
        else if(isEmpty) {
            isUserNameAlreadyUsed = userData.some(data => (data.userName === userName))

            isMailIdAlreadyUsed = userData.some(data => (data.emailId === emailId))
            
            
            
            if (isUserNameAlreadyUsed) {
                this.setState({ isUserNameAlreadyUsed: true })
            } else if (isMailIdAlreadyUsed) {
                this.setState({ isMailIdAlreadyUsed: true })
            } else if (confirmPassword !== password) {
                this.setState({ passwordError: true })
            }
            else if (isEmpty) {
                history.replace('/')
                userData = [...userData, userDetails]
                localStorage.setItem('currentUser', JSON.stringify(userDetails))

                localStorage.setItem('user', JSON.stringify(userData))
            }


        }



    }

    mailIdInputContainer = () => {
        const { isMailIdAlreadyUsed, emailId, emailRequired } = this.state
        return (
            <InputContainer>
                <Label htmlFor="email">EMAIL ID:</Label>
                <Input type="email" onChange={this.onChangeMailId} id="email" placeholder="example@domain.com" value={emailId} onBlur={this.onBlurEmail} />
                {isMailIdAlreadyUsed && <ErrorMsg>*E-mail Id Already Used. Use Another E-mail Id</ErrorMsg>}
                {emailRequired && <ErrorMsg>*Required</ErrorMsg>}
            </InputContainer>
        )
    }

    fullNameInputContainer = () => {
        const { fullName, fullNameRequired } = this.state
        return (
            <InputContainer>
                <Label htmlFor="fullname">FULLNAME:</Label>
                <Input type="text" onChange={this.onChangeFullName} id='fullname' placeholder="Fullname" value={fullName} onBlur={this.onBlurFullname} />
                {fullNameRequired && <ErrorMsg>*Required</ErrorMsg>}
            </InputContainer>
        )
    }

    userNameInputContianer = () => {
        const { isUserNameAlreadyUsed, userName, usernameRequired } = this.state
        return (
            <InputContainer>
                <Label htmlFor="username">USERNAME:</Label>
                <Input type="text" onChange={this.onChangeUserName} id='username' placeholder="Username" value={userName} onBlur={this.onBlurUserName} />
                {usernameRequired && <ErrorMsg>*Required</ErrorMsg>}
                {isUserNameAlreadyUsed && <ErrorMsg>*Username Already Used. Use Another Username</ErrorMsg>}

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
                    {this.fullNameInputContainer()}
                    {this.mailIdInputContainer()}
                    {this.userNameInputContianer()}
                    {this.passwordInputContianer()}
                    {this.confirmPasswordInputContianer()}
                    <SignUpButton type="submit">Sign up</SignUpButton>
                </Form>
                <LogInContainer>
                    <LogInQuestion>Have an account? <StyledLink to="/login"><LogIn type="button" >Log In</LogIn></StyledLink></LogInQuestion>
                </LogInContainer>

            </MainContainer>
        )
    }
}
export default RegisterForm