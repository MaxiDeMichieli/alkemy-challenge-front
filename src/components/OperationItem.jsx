import { Fragment } from 'react';
import { ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const MyListItem = (props) => {

  let icon;
  if (props.children) {
    icon = <ListItemIcon>
      {props.children}
    </ListItemIcon>
  }

  let btns;
  if (props.btns) {
    btns = <Fragment>
      <IconButton edge="end" aria-label="edit">
        <Link to={props.link}>
          <EditIcon />
        </Link>
      </IconButton>
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Fragment>
  }

  return (
    <ListItem>
      {icon}
      <ListItemText primary={props.text} secondary={props.secondaryText} />
      {btns}
    </ListItem>
  );
};

export default MyListItem;