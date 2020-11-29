import { useState, Fragment } from 'react';
import Navbar from './Navbar';
import Drawer from './Drawer';
import { Hidden } from '@material-ui/core';

function Header(props) {
  const [open, setOpen]  = useState(false);

  const actionOpen = () => {
    setOpen(!open)
  }

  let drawer;
  if(props.menu) {
    drawer = <Fragment>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          open={true}
        />
      </Hidden>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={open}
          onClose={actionOpen}
        />
      </Hidden>
    </Fragment>
  } 

  return (
    <Fragment>
      <Navbar menu={props.menu}
        actionOpen={actionOpen}
      />
      {drawer}
    </Fragment>
  );
}

export default Header;