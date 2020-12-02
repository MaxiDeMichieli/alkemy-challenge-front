import { Fragment} from 'react';
import { AppBar, Toolbar, Button, IconButton, Box, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../images/alkLogo.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },
  logo: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
  }
}));

function Header(props) {
  const classes = useStyles();

  let menu;
  if (props.menu) {
    menu = <IconButton
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
      onClick={() => props.actionOpen()}
    >
      <MenuIcon />
    </IconButton>
  }

  let signBtns;
  if (!props.menu) {
    signBtns = <Fragment>
      <Link to="/signin">
        <Box mr={1}>
          <Button color="inherit" href="/signin">Sign in</Button>
        </Box>
      </Link>
      <Link to="/signup">
        <Box>
          <Button color="inherit" variant="outlined">Sign up</Button>
        </Box>
      </Link>
    </Fragment>
  }

  return (
    <AppBar position="fixed" className={props.menu ? classes.appBar : null} >
      <Container>
        <Toolbar>
          {menu}
          <div className={classes.logo}>
            <Link to="/">
              <img src={logo} alt="logo-alk" />
            </Link>
          </div>
          {signBtns}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;