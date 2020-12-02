import React, { Fragment, useEffect, useState } from 'react';
import { Card, Typography, Divider, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import OperationItem from './OperationItem';
import { useHttp } from '../hooks/useHttp';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
  }
}));

function OperationsList(props) {
  const classes = useStyles();

  const [operations, setOperations] = useState([])

  const [http] = useHttp()

  useEffect(() => {
    http.get(props.url)
      .then(({ data }) => {
        if (data.error == null) {
          setOperations(data.operations)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteOperation = (id) => {
    http.delete(`/operations/delete/${id}`)
      .then(({ data }) => {
        if (data.error == null) {
          let operationsFilter = operations.filter(op => {
            return op.id !== id
          })
          setOperations(operationsFilter)
          props.refreshBalance()
          handleClose()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState();

  const handleClickOpen = (id) => {
    setToDelete(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialog = <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">{"Estas seguro que quieres eliminar esta operación"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Si eliminas esta operación no podras recuperarla
    </DialogContentText>
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose} color="primary">
        cancelar
      </Button>
      <Button onClick={() => deleteOperation(toDelete)} color="primary">
        eliminar
      </Button>
    </DialogActions>
  </Dialog>

  return (
    <Fragment>
      {dialog}
      <Card className={classes.card} >
        <Box my={1}>
          <Typography color="textSecondary" variant="h5" align="center" >
            {props.title || 'Últimas operaciones'}
          </Typography>
        </Box>
        {
          operations.map(op => (
            <Fragment key={op.id} >
              <Divider />
              <OperationItem
                delete={() => handleClickOpen(op.id)}
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
    </Fragment>
  );
}

export default OperationsList;