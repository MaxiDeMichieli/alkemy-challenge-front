import Header from '../components/Header';
import { Container, Card, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OperationFormEdit from '../components/OperationFormEdit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  toolbar: theme.mixins.toolbar,
  container: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 800
  },
  content: {
    width: '100%'
  },
  card: {
    width: '90%',
    maxWidth: 620,
    padding: 20
  }
}));

function Edit() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header menu />
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <Container className={classes.container}>
          <Box mb={4}>
            <Typography variant="h3" align="center" color="secondary">
              Edita la operación
            </Typography>
          </Box>
          <Card className={classes.card}>
            <OperationFormEdit />
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default Edit;