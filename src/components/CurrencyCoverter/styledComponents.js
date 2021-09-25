import styled from 'styled-components'

export const AppContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    min-height:90vh;
    background:#0F0F0F;
    
   
    
`
export const Heading=styled.h1`
   font-size:30px;
   color:#fff;
   @media screen and (max-width:576px){
    font-size:26px;
}

`
export const ConverterContainer=styled.div`
    display:flex;
    justify-content:space-around;
    max-width:1440px;
    width:80%;
    margin-bottom:15px;
    @media screen and (max-width:1076px){
        flex-direction:column;
        align-items:center;
    }
`
export const Card=styled.div`
display:flex;
flex-direction:column;
min-width:200px;
color:#fff;
    margin-bottom:15px;
    font-size:14px;
    margin-right:15px;
    @media screen and (max-width:1076px){
        width:80%;
    }
    @media screen and (max-width:576px){
        width:90%;
    }
    
`
export const Select=styled.select`
    outline:none;
    border:none;
    border-radius:4px;
    height:40px;
    @media screen and (max-width:576px){
        height:20px;
    }
`
export const CurrencyHeading=styled.h1`
    color:#3964F5;
    font-size:22px;
`
export const SelectContainer=styled.div`
margin-right:20px;
`


export const Input=styled.input`
outline:none;
border:none;
border-radius:4px;
height:40px;
padding-left:15px;
    font-size:14px;
    color:#000;
    @media screen and (max-width:576px){
        height:20px;
    }

`

export const Result=styled.h1`
font-size:28px;
@media screen and (max-width:576px){
    font-size:20px;
}

`
export const LoaderContainer=styled.div`
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background:#0F0F0F;

`
export const FailureContainer=styled.div`
margin-top: 0px;
margin-left: 30px;
width: 70%;
padding-bottom: 0;

`
export const FailureImage=styled.img`
width: 250px;
height: 200px;
@media screen and (min-width: 768px) {
  width: 400px;
  height: 350px;
}

`
export const FailureHeading=styled.h1`
color: #171f46;
font-family: 'Roboto';
font-size: 20px;
font-weight: 500;
line-height: 1.3;

@media screen and (min-width: 768px) {
  font-size: 24px;
}

`
export const FailureDescription=styled.p`
    text-align: center;
    color: #64748b;
    font-family: 'Roboto';
    font-size: 14px;
    width: 90%;
    max-width: 288px;
    line-height: 1.3;
  @media screen and (min-width: 768px) {
      font-size: 18px;
      width: 60%;
      max-width: 466px;
  }

`
 