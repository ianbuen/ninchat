import React, { useEffect } from "react";
import { makeStyles, Dialog, DialogTitle, TextField, Button, DialogContent, Typography, FormGroup, Box, withStyles } from "@material-ui/core";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import _ from "lodash";
import axios from "axios";

const useStyle = makeStyles(theme => ({
    box: {
        height: "100vh"
    },

    backdrop: {
        background: "#000e"
    },

    dialog: {
        textAlign: "center",
        margin: "0 auto",
        [theme.breakpoints.down("sm")]: {
            maxWidth: 400,
            position: "relative",
            "& div": {
                overflowY: "visible"
            }
        }
    },

    ninja: {
        width: 200,
        height: 200,
        margin: "auto",
        position: "relative",
        right: 5,
        [theme.breakpoints.down("sm")]: {
            width: "125px",
            height: "auto",
            margin: "0 auto"
        }
    },

    logo: {
        marginBottom: "1rem",
        "& h4": {
            fontFamily: "Horobi"
        },
        [theme.breakpoints.down("sm")]: {
        }
    }, 

    form: {
        marginBottom: "3%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        }
    },

    button: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },

    title: {
        padding: 0,
        height: 100
    }

}));

const ErrorText = withStyles({
    root: {
        color: "red"
    }
})(Typography);



// random anon ID
const anonID = Math.floor(Math.random() * 9999);

function StartModal(props) {

    const wow = useStyle();

    const [open, setOpen] = React.useState(true);
    const [time, setTime] = React.useState(Date.now());

    const [setNickname, setUsers] = props.functions;
    const [users, nickname] = props.states;

    const [error, setError] = React.useState("");

    useEffect(() => {

        if ((Date.now() - time) / 1000 > 6) {

            if (!open && (!users.includes(nickname) || nickname.length < 2)) {
                setNickname("");
                setOpen(true);
            }

            setTime(Date.now());
        }
    }, [time, open, users, nickname, setNickname]);

    function submit() {

        if (nickname.length > 1) {
            setOpen(false);
            setError("");
            
            // add to list of online users
            axios.post("/api/online/", {name: _.trim(nickname) + " #" + anonID})
                 .then(user => {setUsers(online => [...online, user.name])})
                 .catch(error => console.log(error));

            setNickname(_.trim(nickname) + " #" + anonID);

        } else {
            setOpen(true);
            setError("* Nickname must be at least 2 letters.");
        }
    }

    function getNickname(event) {
        const {value} = event.target;
        
        setNickname(value.substring(0, 12));
    }

    function getKey(event) {
        const {key} = event;

        key === "Enter" && submit();
    }

    return (
        <Dialog 
        open={open}
        BackdropProps={{classes: {root: wow.backdrop}}}
        className={wow.dialog}>
            <img className={wow.ninja} src={window.location.origin + "/ninja.png"} title="Logo made by ianbuen" alt="Ninchat Logo" />

            <DialogTitle className={wow.title}>
                Welcome to

                <Box className={wow.logo}>
                    <Typography variant="h4">NINCHAT!</Typography>
                    <Typography gutterBottom variant="body2">by ianbuen</Typography> 
                </Box>

            </DialogTitle>

            <DialogContent >
                <ErrorText>{error}</ErrorText>

                <FormGroup row className={wow.form}>
                    <TextField variant="outlined" value={nickname} onChange={getNickname} onKeyPress={getKey} autoFocus 
                               placeholder="Your nickname?" size="small" />
                    <Button onClick={submit} variant="outlined"><MeetingRoomIcon /></Button>
                </FormGroup>

            </DialogContent>
        </Dialog>
    );
}

export default StartModal;