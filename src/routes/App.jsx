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
          <Route path="/alkemy-challenge-front/authentication/activate/:token" >
            <ActivateAccount />
          </Route>
          <Route path="/alkemy-challenge-front/edit/:id" exact>
            <PrivateRoutes component={<Edit />} />
          </Route>
          <Route path="/alkemy-challenge-front/income" exact>
            <PrivateRoutes component={<Operations title={'Últimos ingresos'} url="/operations/list?limit=50&offset=0&type=ingreso" />} />
          </Route>
          <Route path="/alkemy-challenge-front/expenses" exact>
            <PrivateRoutes component={<Operations title={'Últimos egresos'} url="/operations/list?limit=50&offset=0&type=egreso" />} />
          </Route>
          <Route path="/alkemy-challenge-front/dashboard" exact>
            <PrivateRoutes component={<Dashboard />} />
          </Route>
          <Route path="/alkemy-challenge-front/new-operation" exact>
            <PrivateRoutes component={<NewOperation />} />
          </Route>
          <Route path="/alkemy-challenge-front/logout" exact>
            <PrivateRoutes component={<Logout />} />
          </Route>
          <Route path="/alkemy-challenge-front/forgotpassword" exact>
            <PublicRoutes component={<ForgotPassword />} />
          </Route>
          <Route path="/alkemy-challenge-front/resetpassword/:resetLink" exact>
            <PublicRoutes component={<ResetPassword />} />
          </Route>
          <Route path="/alkemy-challenge-front/signin" exact>
            <PublicRoutes component={<Sign type={0} />} />
          </Route>
          <Route path="/alkemy-challenge-front/signup" exact>
            <PublicRoutes component={<Sign type={1} />} />
          </Route>
          <Route path="/alkemy-challenge-front/" exact>
            <PublicRoutes component={<Home />} />
          </Route>
          <Route path="/alkemy-challenge-front/*" >
            <PublicRoutes component={<Redirect to="/" />} />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;