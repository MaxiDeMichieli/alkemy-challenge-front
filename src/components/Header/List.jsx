import { List, Divider } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import MyListItem from './ListImes';

const MyList = () => {
  return (
    <div>
      <List component="nav" aria-label="cicle">
        <MyListItem
          link="/account"
          text="Maximo De Michieli"
        >
          <AccountCircleIcon />
        </MyListItem>
        <Divider />
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
      </List>
      <Divider />
    </div>
  );
};

export default MyList;