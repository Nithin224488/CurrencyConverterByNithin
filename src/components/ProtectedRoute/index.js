import { Route ,Redirect} from "react-router"

const ProtectedRoute=props=>{
    const currentUser=JSON.parse(localStorage.getItem('currentUser'))
    console.log(currentUser)
    
    if (currentUser!==null){
        return <Route {...props}/>
    }
        return <Redirect to="/login" />
    

}
export default ProtectedRoute