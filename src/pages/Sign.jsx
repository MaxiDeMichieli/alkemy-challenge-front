import Header from '../components/Header';
import Form from '../components/Form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  toolbar: theme.mixins.toolbar,
  div: {
    width: '100%',
  }
}));

function Sign(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header menu={false} />
      <div className={classes.div} >
        <div className={classes.toolbar} />
        <Form type={props.type} />
      </div>
    </div>
  );
}

export default Sign;