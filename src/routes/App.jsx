import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Sign from '../pages/Sign';
import NewOperation from '../pages/NewOperation';
import Dashboard from '../pages/Dashboard';


function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/new-operation">
            <NewOperation />
          </Route>
          <Route path="/signin" exact>
            <Sign type={0} />
          </Route>
          <Route path="/signup" exact>
            <Sign type={1} />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;