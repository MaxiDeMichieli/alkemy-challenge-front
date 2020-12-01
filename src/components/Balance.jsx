import { Grid, Container, Card, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MyListItem from './OperationItem';
import OperationList from './OperationsList';


const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
  },
}));

function Balance() {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={4} >
          <Card className={classes.card} >
            <MyListItem
              text={
                <Typography color="textSecondary" variant="subtitle1" >
                  Balance actual
                </Typography>
              }
              secondaryText={
                <Typography color="textSecondary" variant="h6" >
                  + $2000
                </Typography>
              }
            />
            <Divider />
            <MyListItem
              text={
                <Typography color="textSecondary" variant="subtitle1" >
                  Ingresos: 13
                </Typography>
              }
              secondaryText={
                <Typography color="textSecondary" variant="h6" >
                  <ArrowDropUpIcon /> $4300
                </Typography>
              }
            />
            <Divider />
            <MyListItem
              text={
                <Typography color="textSecondary" variant="subtitle1" >
                  Egresos: 8
                </Typography>
              }
              secondaryText={
                <Typography color="textSecondary" variant="h6" >
                  <ArrowDropDownIcon /> $2300
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} >
          <OperationList url="/operations/list?limit=10&offset=0" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Balance;