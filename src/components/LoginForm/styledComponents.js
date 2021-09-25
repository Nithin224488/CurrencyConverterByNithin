import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const MainContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#0F0F0F;
   
    
`
export const Heading=styled.h1`
    font-size:32px;
    color:#3964F5;
    @media screen and (max-width:567px){
        font-size:28px;
    }

`
export const Form=styled.form`
    border:solid 3px grey;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    padding:30px;
    height:350px;
    width:350px;
    margin-bottom:30px;
    @media screen and (max-width:567px){
        width:80%;
    }

`
export const InputContainer=styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
`
export const Label=styled.label`
    color:#fff;
    margin-bottom:15px;
    font-size:14px;
    
`
export const Input=styled.input`
    outline:none;
    border:none;
    border-radius:4px;
    height:40px;
    padding-left:15px;
    font-size:14px;
`
export const LoginButton=styled.button`
border-radius:8px;
outline:none;
    border:none;
    width:100%;
    padding:16px;
    background:#3964F5;
    color:#fff;
    font-size:18px;
    font-weight:600;
    cursor:pointer;
`
export const ForgotPasswordContainer=styled.div`
border:solid 3px grey;
padding:30px;
width:350px;
text-align:center;

margin-bottom:30px;
@media screen and (max-width:567px){
    width:80%;
}
`
export const StyledLink=styled(Link)`
text-decoration:none;
`
export const ForgetPassword=styled.p`
color:#3964F5;
font-size:18px;
cursor:pointer;
`
export const SignUpContainer=styled.div`
    border:solid 3px grey;
    padding:30px;
    width:350px;
    text-align:center;
    @media screen and (max-width:567px){
        width:80%;
    }
`
export const SignUpQuestion=styled.p`
    font-size:18px;
    color:#ffff;
`
export const SignUp=styled.span`
font-size:18px;
color:#3964F5;
font-weight:bold;
cursor:pointer;

`
export const ErrorMsg=styled.p`
    color:red;
    font-size:12px;
`