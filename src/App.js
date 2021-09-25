import {BrowserRouter,Switch,Route} from 'react-router-dom' 
import CurrenctConverter from './components/CurrencyCoverter'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';
import ForgetPassword from './components/ForgetPassword';

const App=()=>(<BrowserRouter>
<Switch>
    <Route exact path="/login" component={LoginForm}/>
    <Route exact path="/sign-up" component={RegisterForm}/>
    <Route exact path="/forget-password" component={ForgetPassword}/>
    <ProtectedRoute exact path="/" component={CurrenctConverter}/>
    
</Switch>
</BrowserRouter>)

export default App;
