import { Fragment } from 'react';
import { ListItem, ListItemIcon, ListItemText, IconButton, Box } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
      <IconButton edge="end" aria-label="comments">
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="comments">
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