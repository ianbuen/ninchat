import React from "react";
import { Paper, makeStyles, Typography, Box, withStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    you: {
        background: "#333",
        color: "white",
        borderRadius: "2vw",
        padding: "1.25vw",
        float: "right",
        maxWidth: "40%",
        textAlign: "right",
        "& p": {
            wordBreak: "break-word"
        }
    },

    others: {
        background: "#eee",
        borderRadius: "2vw",
        border: "1px solid #0001",
        padding: "1.25vw",
        float: "left",
        maxWidth: "40%",
        "& p": {
            wordBreak: "break-word"
        }
    },

    author: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.75rem"
        }
    }
}));

const Content = withStyles((theme) => ({
    root: {
        fontSize: "1.2rem",
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.8rem"
        },
        
    }
}))(Typography);


function Message(props) {

    const wow = useStyles();

    const {author, currentUser} = props;

    const isYou = author === currentUser ? true : false;

    return (
        <Paper className={isYou ? wow.you : wow.others} >  
            <Box >
                {!isYou && <Typography className={wow.author}>[{author}]:</Typography>}
                <Content>{props.text}</Content>
            </Box>

            
        </Paper>
    );
}


export default Message;
