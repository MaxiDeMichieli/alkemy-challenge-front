import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Sign from '../pages/Sign';
import NewOperation from '../pages/NewOperation';
import Dashboard from '../pages/Dashboard';
import Operations from '../pages/Operations';
import Edit from '../pages/Edit';
import ActivateAccount from '../pages/ActivateAccount';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import Logout from '../pages/Logout'
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';


function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/authentication/activate/:token" >
            <ActivateAccount />
          </Route>
          <Route path="/edit/:id" exact>
            <PrivateRoutes component={<Edit />} />
          </Route>
          <Route path="/income" exact>
            <PrivateRoutes component={<Operations title={'Últimos ingresos'} />} />
          </Route>
          <Route path="/expenses" exact>
            <PrivateRoutes component={<Operations title={'Últimos egresos'} />} />
          </Route>
          <Route path="/dashboard" exact>
            <PrivateRoutes component={<Dashboard />} />
          </Route>
          <Route path="/new-operation" exact>
            <PrivateRoutes component={<NewOperation />} />
          </Route>
          <Route path="/logout" exact>
            <PrivateRoutes component={<Logout />} />
          </Route>
          <Route path="/forgotpassword" exact>
            <PublicRoutes component={<ForgotPassword />} />
          </Route>
          <Route path="/resetpassword/:resetLink" exact>
            <PublicRoutes component={<ResetPassword />} />
          </Route>
          <Route path="/signin" exact>
            <PublicRoutes component={<Sign type={0} />} />
          </Route>
          <Route path="/signup" exact>
            <PublicRoutes component={<Sign type={1} />} />
          </Route>
          <Route path="/" exact>
            <PublicRoutes component={<Home />} />
          </Route>
          <Route path="/*" >
            <PublicRoutes component={<Redirect to="/" />} />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;