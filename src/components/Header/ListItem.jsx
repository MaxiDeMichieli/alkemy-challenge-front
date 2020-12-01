import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from 'react-router-dom';

const MyListItem = (props) => {

  let icon;
  if (props.children) {
    icon = <ListItemIcon>
      {props.children}
    </ListItemIcon>
  }

  return (
    <Link to={props.link}>
      <ListItem button>
        {icon}
        <ListItemText primary={props.text} secondary={props.secondaryText} />
      </ListItem>
    </Link>
  );
};

export default MyListItem;