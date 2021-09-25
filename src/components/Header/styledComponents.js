import styled from "styled-components";

export const HeaderContainer=styled.div`
display:flex;
justify-content:space-around;
padding:20px;
background:#000;

`
export const Logo=styled.h1`
color:#3964F5;
font-size:32px;
@media screen and (max-width:576px){
    font-size:28px;}
`
export const LogOut=styled.button`
    border:none;
    border-radius:8px;
    padding:0px 32px 0px 32px;
    height:50px;
    align-self:center;
    outline:none;
    background-color:#3964F5;
    color:#fff;
    font-size:18px;
    cursor:pointer;
    @media screen and (max-width:576px){
        padding:6px 8px 6px 8px;
        font-size:14px;
    }
`