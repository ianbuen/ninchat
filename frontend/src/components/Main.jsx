import React, { useEffect, useRef } from "react";
import { Grid, Box, Fab } from "@material-ui/core";
import Message from "./Message";
import ChatControls from "./ChatControls";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import _ from "lodash";

import useStyles from "../styles/mainStyles";

import axios from "axios";


function Main(props) {

    const wow = useStyles();

    const [messages, setMessages] = React.useState([]);
    const [message, setMessage] = React.useState({ content: "", author: "" });

    const nickname = props.nickname;
    const [setNickname] = props.functions;
    
    const chatbox = useRef(null);
    const scrollButton = useRef(null);
    const [scroll, setScroll] = React.useState(false); 

    function onType(event) {
        event.preventDefault();
        const {value} = event.target;
        setMessage(msg => ({...msg, content: value}));
    }

    // send message to DB and signal to scroll to bottom
    function onSend() {

        if (_.trim(message.content) !== "") {
            axios.post("/api/send/", {content: _.trim(message.content), author: nickname})
            .then(response => {setMessage({ content: "", author: "" }); setScroll(true); })
            .catch(error => console.log(error))
            // .finally(setScroll(true));
        }
    }

    // Fab onClick function
    function scrollToBottom() {
        scrollButton.current.style.visibility = "hidden"; 
        chatbox.current.scroll({ top: (chatbox.current.scrollHeight) });
        setScroll(false);
    }


    // retrieve from DB to display when messages get updated
    useEffect(()=>{
        axios.get("/api/messages")
             .then(response => setMessages(response.data.messages))
             .catch(error => console.log(error))
             .finally(() => (scroll && scrollToBottom()));

        if (chatbox && scrollButton) {
            const {scrollTop, clientHeight, scrollHeight} = chatbox.current; 
            scrollButton.current.style.visibility = scrollTop + clientHeight < scrollHeight ? "visible" : "hidden"; 
        }
             
    }, [messages, scroll]);


    // dynamically show/hide scroll-to-bottom button based on scroll position
    useEffect(() => {
        if (chatbox && scrollButton) {
            setScroll(true);
            chatbox.current.addEventListener("scroll", () => {
                const {scrollTop, clientHeight, scrollHeight} = chatbox.current; 
                scrollButton.current.style.visibility = scrollTop + clientHeight < scrollHeight ? "visible" : "hidden"; 
            });
        }
    }, []);


    return (
        <Box display="flex" justifyContent="center" alignItems="center" className={wow.main}>
            
            {/* chat frame */}
            <Box className={wow.chat} >

                {/* chat window */} 
                <Grid container item className={wow.chatWindow} ref={chatbox} alignContent="flex-start"> 
                    {messages.map((msg, index) => (
                        <Grid item key={index} className={wow.msgBody} xs={12}>
                            <Message text={msg.content} author={msg.author} currentUser={nickname} />
                        </Grid>))}
                </Grid>

                {/* chat input */}
                <Box className={wow.chatInput} display="flex" justifyContent="center" alignItems="center">
                    <ChatControls nickname={nickname} functions={[onType, onSend, setNickname]} states={[message]} />
                </Box>

                <Fab className={wow.scrollButton} ref={scrollButton} onClick={scrollToBottom} >
                    <ArrowDownwardIcon />
                </Fab>

            </Box>

        </Box>
    );
}

export default Main;