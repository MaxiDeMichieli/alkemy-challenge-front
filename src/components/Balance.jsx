import { useEffect, useState } from 'react';
import { Grid, Container, Card, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MyListItem from './OperationItem';
import OperationList from './OperationsList';
import axios from '../axios/axios';


const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
  },
}));

function Balance() {
  const classes = useStyles();

  const [balance, setBalance] = useState({})

  const getBalance = () =>{
    let api = axios();
    api.get('/operations/balance')
      .then(({ data }) => {
        if (data.error == null) {
          setBalance(data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getBalance()
  }, [])

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
                  $ {balance.balance || 0}
                </Typography>
              }
            />
            <Divider />
            <MyListItem
              text={
                <Typography color="textSecondary" variant="subtitle1" >
                  Ingresos: {balance.incomes || 0}
                </Typography>
              }
              secondaryText={
                <Typography color="textSecondary" variant="h6" >
                  <ArrowDropUpIcon /> ${balance.incomesBalance || 0}
                </Typography>
              }
            />
            <Divider />
            <MyListItem
              text={
                <Typography color="textSecondary" variant="subtitle1" >
                  Egresos: {balance.expenses || 0}
                </Typography>
              }
              secondaryText={
                <Typography color="textSecondary" variant="h6" >
                  <ArrowDropDownIcon /> ${balance.expensesBalance || 0}
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} >
          <OperationList url="/operations/list?limit=10&offset=0" refreshBalance={getBalance} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Balance;