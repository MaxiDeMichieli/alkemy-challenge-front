import { List, Divider } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MyListItem from './ListItem';

const MyList = () => {
  return (
    <div>
      <List component="nav" aria-label="cicle">
        <MyListItem
          link="/alkemy-challenge-front/dashboard"
          text="Bienvenidx!"
        >
          <AccountCircleIcon />
        </MyListItem>
        <Divider />
        <MyListItem
          link="/alkemy-challenge-front/dashboard"
          text="Dashboard"
        >
          <DashboardIcon />
        </MyListItem>
        <MyListItem
          link="/alkemy-challenge-front/income"
          text="Ingresos"
        >
          <AttachMoneyRoundedIcon />
        </MyListItem>
        <MyListItem
          link="/alkemy-challenge-front/expenses"
          text="Egresos"
        >
          <MoneyOffRoundedIcon />
        </MyListItem>
        <MyListItem
          link="/alkemy-challenge-front/new-operation"
          text="Nueva operación"
        >
          <AddCircleOutlineRoundedIcon />
        </MyListItem>
        <Divider />
        <MyListItem
          link="/alkemy-challenge-front/logout"
          text="Cerrar sesión"
        >
          <ExitToAppIcon />
        </MyListItem>
      </List>
      <Divider />
    </div>
  );
};

export default MyList;