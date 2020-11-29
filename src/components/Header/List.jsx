import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

const ListaMUI = () => {
  return (
    <div>
      <List component="nav" aria-label="cicle">
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Maximo De Michieli" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <AttachMoneyRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Ingresos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MoneyOffRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Egresos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AddCircleOutlineRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Nueva operación" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default ListaMUI;