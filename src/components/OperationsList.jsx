import { Card, Typography, Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import OperationItem from './OperationItem';


const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
  }
}));

function OperationsList(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} >
      <Box my={1}>
        <Typography color="textSecondary" variant="h5" align="center" >
          {props.title || 'Últimas operaciones'}
        </Typography>
      </Box>
      <Divider />
      <OperationItem
        btns
        text={
          <Typography color="textSecondary" variant="body2" >
            Este es un ejemplo...
          </Typography>
        }
        secondaryText={
          <Typography color="textSecondary" variant="subtitle1" >
            <ArrowDropUpIcon /> $2000
          </Typography>
        }
      />
      <Divider />
      <OperationItem
        btns
        text={
          <Typography color="textSecondary" variant="body2" >
            Este es un ejemplo...
          </Typography>
        }
        secondaryText={
          <Typography color="textSecondary" variant="subtitle1" >
            <ArrowDropUpIcon /> $4300
          </Typography>
        }
      />
      <Divider />
      <OperationItem
        btns
        text={
          <Typography color="textSecondary" variant="body2" >
            Lorem ipsum dolor...
          </Typography>
        }
        secondaryText={
          <Typography color="textSecondary" variant="subtitle1" >
            <ArrowDropDownIcon /> $2300
          </Typography>
        }
      />
    </Card>
  );
}

export default OperationsList;