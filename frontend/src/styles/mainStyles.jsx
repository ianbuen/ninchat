import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    '@global': {
        '*::-webkit-scrollbar': {
            width: "0.5rem",
            background: "#5551"
        },

        '*::-webkit-scrollbar-thumb': {
            background: "#555"
        }
      },

    main: {
        background: "#d9e4dd",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            height: "90vh"
        }
    },
    
    chat: {
        background: "#fbf7f0",
        borderRadius: 5,
        height: "93%",
        width: "93%",
        boxShadow: "0.1rem 0.5rem 2rem #0002",
        [theme.breakpoints.down("sm")]: {
            height: "100vh",
            width: "100%"
        }
    },

    chatWindow: {
        background: "#0001",
        height: "85%",
        maxHeight: "85vh",
        width: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
        padding: "2% 5% 5%",
        boxSizing: "border-box",
        [theme.breakpoints.down("sm")]: {
            position: "relative",
            top: 70,
            paddingBottom: "10%"
        }
    },

    msgBody: {
        margin: "0.5% 0"
    }, 

    chatInput: {
        height: "15%",
        [theme.breakpoints.down("sm")]: {
            display: "inline-block",
            background: "#555",
            width: "100%",
            height: "auto",
            padding: "2% 0",
            position: "fixed",
            bottom: 0
        }
    },

    chatText: {
        borderRight: "none 0px black"
    },

    chatSend: {
        fontSize: "2rem",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },

    scrollButton: { 
        position: "absolute",
        bottom: "22%",
        left: "60%",
        [theme.breakpoints.down("sm")]: {
            bottom: "15%",
            left: "45%"
        }
    }
}));


export default useStyles;