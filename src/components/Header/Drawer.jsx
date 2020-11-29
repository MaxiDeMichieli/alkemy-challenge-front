import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Divider } from '@material-ui/core';
import List from './List';

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
}));

function MyDrawer(props) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant={props.variant}
      classes={{
        paper: classes.drawerPaper
      }}
      open={props.open}
      onClose={props.onClose ? props.onClose : null}
    >
      <div className={classes.toolbar} ></div>
      <Divider />
      <List />
    </Drawer>
  );
}

export default MyDrawer;