import React, { useEffect } from "react";
import {Grid, makeStyles} from "@material-ui/core";
import Sidebar from "./components/Sidebar";
import StartDialog from "./components/StartDialog";
import Main from "./components/Main";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    main: {
        width: "100vw",
        height: "100vh",
    }
}));

let time = Date.now();

function App() {
    const wow = useStyles();

    const [users, setUsers] = React.useState([]);
    const [nickname, setNickname] = React.useState("");

    
    useEffect(() => { 

        if ((Date.now() - time) / 1000 >= 10 && nickname !== "") {
            axios.patch("/api/online/", {name: nickname})
                 .catch(err => console.log(err));

            time = Date.now();
        }

    });


    return (
        <Grid container className={wow.main} >
            <Grid item xs={12} md={3} className={wow.bar}>
                <Sidebar listUsers={users} setListUsers={setUsers} />
            </Grid>

            <Grid item xs={12} md={9}>
                <Main nickname={nickname} functions={[setNickname]} />
            </Grid>

            <StartDialog states={[users, nickname]} functions={[setNickname, setUsers]} />
        </Grid>
    );
}

export default App;