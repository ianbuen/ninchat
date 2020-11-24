import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase'; 
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send'; 
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "95%",
    border: "1px solid #0005",
    margin: "auto"
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    lineHeight: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      
    }
  },

  iconButton: {
    padding: "2% 1% 2% 2%",
    borderLeft: "1px solid #0003",
    borderRadius: 0,
    [theme.breakpoints.down("sm")]: {
      "& h4": {
        display: "none"
      }
    }
  },

  icon: {
    paddingLeft: "0.5rem"
  } 
}));

export default function ChatControls(props) {
    const classes = useStyles();

    const textField = useRef(null);

    const [onType, onSend] = props.functions;
    const [message] = props.states;
    const {nickname} = props;

    function onKey(event) {
        if (nickname === "") 
            event.preventDefault(); 

        if (event.key === "Enter") {
            event.preventDefault();
            onSend();
        }
    }

    function onClick(event) {
        if (nickname === "")
            event.preventDefault();   

        onSend();
        textField.current.focus();
    } 

    return (
        <Paper className={classes.root} variant="outlined">
            <InputBase
                onChange={onType}
                onKeyPress={onKey} 
                className={classes.input}
                inputProps={{style: {fontSize: "1.4rem"}}}
                multiline
                fullWidth
                autoFocus
                value={message.content}
                inputRef={textField}
            /> 

            <IconButton type="submit" className={classes.iconButton} onClick={onClick} >
                <Typography variant="h4">Send</Typography> 
                <SendIcon fontSize="large" className={classes.icon} />
            </IconButton> 
        </Paper>
    );
}
