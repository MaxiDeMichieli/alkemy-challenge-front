import { Fragment, useEffect, useState } from 'react';
import { Card, Typography, Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import OperationItem from './OperationItem';
import axios from '../axios/axios';


const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
  }
}));

function OperationsList(props) {
  const classes = useStyles();

  const [operations, setOperations] = useState([])

  useEffect(() => {
    let api = axios();
    api.get(props.url)
      .then(({ data }) => {
        if (data.error == null) {
          setOperations(data.operations)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [props])

  return (
    <Card className={classes.card} >
      <Box my={1}>
        <Typography color="textSecondary" variant="h5" align="center" >
          {props.title || 'Últimas operaciones'}
        </Typography>
      </Box>
      {
        operations.map(op => (
          <Fragment>
            <Divider />
            <OperationItem
              link={`/edit/${op.id}`}
              btns
              text={
                <Typography color="textSecondary" variant="body2" >
                  {op.concept} | {op.date}
                </Typography>
              }
              secondaryText={
                <Typography color="textSecondary" variant="subtitle1" >
                  {op.type === 'ingreso' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} ${op.amount}
                </Typography>
              }
            />
          </Fragment>
        ))
      }
    </Card>
  );
}

export default OperationsList;