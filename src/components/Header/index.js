import {HeaderContainer,Logo,LogOut} from './styledComponents'
import { withRouter } from 'react-router'
const Header=props=>{

    const onClickLogOut=()=>{
        const {history}=props
        localStorage.removeItem("currentUser")
        history.replace('/login')

    }

    return(
        <HeaderContainer>
            <Logo>Currency Converter</Logo>
            <LogOut type="button" onClick={onClickLogOut}>Log out</LogOut>
        </HeaderContainer>
    )
}
export default withRouter(Header)