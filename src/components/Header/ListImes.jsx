import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from 'react-router-dom';

const MyListItem = (props) => {
  return (
    <Link to={props.link}>
      <ListItem button>
        <ListItemIcon>
          {props.children}
        </ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </Link>
  );
};

export default MyListItem;