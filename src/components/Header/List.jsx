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
          link="/dashboard"
          text="Maximo De Michieli"
        >
          <AccountCircleIcon />
        </MyListItem>
        <Divider />
        <MyListItem
          link="/dashboard"
          text="Dashboard"
        >
          <DashboardIcon />
        </MyListItem>
        <MyListItem
          link="/income"
          text="Ingresos"
        >
          <AttachMoneyRoundedIcon />
        </MyListItem>
        <MyListItem
          link="/expenses"
          text="Egresos"
        >
          <MoneyOffRoundedIcon />
        </MyListItem>
        <MyListItem
          link="/new-operation"
          text="Nueva operación"
        >
          <AddCircleOutlineRoundedIcon />
        </MyListItem>
        <Divider />
        <MyListItem
          link="/logout"
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