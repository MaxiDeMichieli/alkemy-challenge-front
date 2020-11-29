import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  }
}));

const Signin = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField id="standard-basic" label="Email*" className={classes.textField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="standard-basic" label="Contraseña*" type="password" className={classes.textField} />
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            <Button variant="contained" color="secondary" fullWidth >iniciar sesión</Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Signin