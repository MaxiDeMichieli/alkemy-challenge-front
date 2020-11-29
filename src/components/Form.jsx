import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Signin from './Form/Signin';
import Signup from './Form/Signup';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 60,
  },
  formContainer: {
    width: 300,
  },
  cardContainer: {
    minWidth: 300,
    maxWidth: 500,
    width: '90%'
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Form = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.type);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <div className={classes.cardContainer}>
        <Card>
          <div className={classes.root}>
            <AppBar position="static" color="secondary">
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                indicatorColor="primary"
              >
                <Tab label="Inicia sesión" {...a11yProps(0)} />
                <Tab label="Registrate" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Signin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Signup />
            </TabPanel>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Form