import { Fragment} from 'react';
import { AppBar, Toolbar, Button, IconButton, Box, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../images/alkLogo.svg';

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
      <Box mr={1}>
        <Button color="inherit" href="/signin">Sign in</Button>
      </Box>
      <Box>
        <Button color="inherit" variant="outlined">Sign up</Button>
      </Box>
    </Fragment>
  }

  return (
    <AppBar position="fixed" className={props.menu ? classes.appBar : null} >
      <Container>
        <Toolbar>
          {menu}
          <div className={classes.logo}>
            <img src={logo} alt="logo-alk" />
          </div>
          {signBtns}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;