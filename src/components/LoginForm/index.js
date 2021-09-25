import { Component } from 'react'
import { Redirect } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import {
    MainContainer, Heading, Form, InputContainer, Label, Input,
    LoginButton, SignUpContainer, ForgotPasswordContainer, StyledLink, ForgetPassword,
    SignUpQuestion, SignUp, ErrorMsg
} from './styledComponents'

class LoginForm extends Component {
    state = { userName: '', password: "", isLoginError: false, usernameRequired: false, passwordRequired: false }

    onChangeUserName = event => {
        this.setState({ userName: event.target.value })
    }

    onChangePassword = event => {
        this.setState({ password: event.target.value })
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
    submitForm = event => {
        event.preventDefault()
        const { history } = this.props
        const { userName, password } = this.state
        let userDetails = { userName, password }
        let userData = JSON.parse(localStorage.getItem('user'))
        if (userData!==null){
            const result = userData.some(data => (
                data.userName === userName && data.password === password
            ))
    
            if (result) {
                history.replace('/')
                localStorage.setItem('currentUser', JSON.stringify(userDetails))
            } else {
                let isUserSignIned=userData.some(data=>(
                    data.userName===userName
                ))
                if (isUserSignIned){
                    console.log("1")
                    this.setState({ isLoginError: true,loginError:"*Wrong Password" })
                }else{
                    this.setState({ isLoginError: true,loginError:"*Wrong Username" })
                }

                
            }

        }else {
            this.setState({ isLoginError: true , loginError:"*User Doesn't Exists"})
        }

       

    }


    userNameInputContianer = () => {
        const { userName, usernameRequired } = this.state
        return (
            <InputContainer>
                <Label htmlFor="username">USERNAME:</Label>
                <Input type="text" onChange={this.onChangeUserName} id="username" placeholder="Username" value={userName} onBlur={this.onBlurUserName} />
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

    responseGoogle = response => {
        const { history } = this.props
        
        let userDetails = {
            userName: response.profileObj.givenName,
            password: response.profileObj.googleId
        }
        localStorage.setItem('currentUser', JSON.stringify(userDetails))
        history.replace('/')

    }

    render() {
        const { loginError,isLoginError } = this.state
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
                    {isLoginError && <ErrorMsg>{loginError}</ErrorMsg>}
                    <LoginButton type="submit">Sign In</LoginButton>
                </Form>
                <ForgotPasswordContainer>

                <GoogleLogin
                        clientId='812547707128-iog6b28o9087u3majoe46ubke51rdui7.apps.googleusercontent.com'
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    <StyledLink to="/forget-password"> <ForgetPassword>Forget password?</ForgetPassword></StyledLink>

                </ForgotPasswordContainer>
                <SignUpContainer>
                    <SignUpQuestion>Don't have an account? <StyledLink to="/sign-up"><SignUp >Sign Up</SignUp></StyledLink></SignUpQuestion>
                </SignUpContainer>

            </MainContainer>
        )
    }
}
export default LoginForm