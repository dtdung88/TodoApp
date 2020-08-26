import React, { useState } from 'react'
import { ListItem, List, ListItemText, Modal, Button, Input} from '@material-ui/core';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import './Todo.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const updateTodo = () => {
        // update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            task: input
        }, { merge: true });
        setOpen(false);
    }

    return (
        <div>
            <Modal open={open} onClose={e => setOpen(false)}>
                <div className={classes.paper}>
                    <h1>MODIFY</h1>
                    <Input placeholder={props.todo.task} value={input} onChange={event => setInput(event.target.value)} />
                    <Button onClick={updateTodo} variant="contained" color="primary">Update Todo</Button>
                </div>
            </Modal>
            <List classname="todo_list">
                <ListItem>
                    <ListItemText primary={props.todo.task} secondary="Need to do" ></ListItemText>
                </ListItem>
                <EditIcon onClick={e => setOpen(true)}>Edit</EditIcon>
                <DeleteForeverIcon onClick={event =>db.collection('todos').doc(props.todo.id).delete()} />
            </List>
        </div>
    )
}

export default Todo
