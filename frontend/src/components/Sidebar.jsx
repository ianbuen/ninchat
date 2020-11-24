import React, { useEffect } from "react";
import { Box, Card, CardMedia, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography, IconButton, Drawer } from "@material-ui/core"; 

import Brightness1Icon from '@material-ui/icons/Brightness1';
import MenuIcon from '@material-ui/icons/Menu';

import axios from "axios";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
    
        sidebar: {
            background: "#555",
            height: "100%",
            maxHeight: "100vh",
            color: "#fff",
            textAlign: "center",
            overflowY: "scroll",
            [theme.breakpoints.down("sm")]: {
                flexDirection: "row",
                position: "fixed",
                width: "100%",
                height: "70px",
                top: 0,
                zIndex: 1,
            }
        },

        logo: {
            [theme.breakpoints.down("sm")]: {
                display: "flex",
                width: "100%",
                height: "auto",
                alignItems: "center",
                justifyContent: "center"  
            }
        },
    
        ninja: {
            background: "transparent",
            width: 200,
            height: 200,
            margin: "2rem 0",
            [theme.breakpoints.down("sm")]: {
                display: "inline-block",
                width: "4rem",
                height: "100%",
                margin: 0,
                flexGrow: 0
            }
        },
    
        title: {
            fontFamily: "Horobi",
            marginBottom: "2rem", 
            [theme.breakpoints.down("sm")]: {
                display: "inline-block",
                fontSize: "1.5rem",
                margin: 0
            }
        },

        count: {
            [theme.breakpoints.down("sm")]: {
                display: "none"
            }
        },
    
        divider: {
            margin: "1rem 0"
        },

        menuButton: {
            display: "none",
            borderRadius: 5,
            background: "#a84f4f",
            position: "absolute",
            padding: 10,
            left: "3%",
            [theme.breakpoints.down("sm")]: {
                display: "inline-flex"
            }
        },

        drawer: {
            display: "none",
            [theme.breakpoints.down("sm")]: {
                width: 250,
                height: "100%",
                color: "white",
                background: "#333",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "10%"
            }   
        },

        pc: {
            display: "block",
            [theme.breakpoints.down("sm")]: {
                display: "none"    
            }   
        }
    }
))

function Sidebar(props) {

    const wow = useStyles();

    const listUsers = props.listUsers;
    const setListUsers = props.setListUsers;

    const [drawerOpen, setDrawerOpen] = React.useState(false); 


    // for mobile sidebar
    function toggleDrawer(event) {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(!drawerOpen);
    }

    function showUserCount() {
        return (<Typography variant="h5" className={wow.count}>{"Users Online: " + listUsers.length}</Typography>);
    }

    // retrieve list of online users    
    useEffect(() => {
        axios.get("/api/online/")
             .then(response => {
                const {users} = response.data;
                setListUsers(users.map(user => user.name));
             })
             .catch(error => console.log(error));
    }, [listUsers, setListUsers]);


    return (
        <Box className={wow.sidebar} display="flex" justifyContent="flex-start" alignItems="center" flexDirection="column">

            {/* Hamburger Menu */}
            <IconButton variant="contained" className={wow.menuButton} onClick={toggleDrawer} >
                <MenuIcon />
            </IconButton>

            {/* logo and user count */}
            <Box className={wow.logo}>
                <Card className={wow.ninja} elevation={0}>
                    <CardMedia component="img" image={window.location.origin + "/ninja.png"} title="Ninchat by ianbuen" />
                </Card>

                <Typography variant="h2" className={wow.title} gutterBottom>
                    NINCHAT!
                    <Typography>by Ian</Typography>
                </Typography>
                
                <Typography variant="h6" className={wow.count}>{"Visitor(s) Online: " + listUsers.length}</Typography>
            </Box>

            {/* for mobile */}
            <Drawer open={drawerOpen} onClose={toggleDrawer}>
                <Box className={wow.drawer}>
                    <Typography variant="h6">{"Users Online: " + listUsers.length}</Typography>
                    {putOnlineList()}
                </Box>
            </Drawer>

            {/* for PC */}
            <Box className={wow.pc}>
                {putOnlineList()}
            </Box>
            
        </Box>
    );
    
    function putOnlineList() {
        return (
            <List disablePadding className={wow.list}>
                {listUsers.map((user, id) => 
                    <ListItem key={id}>
                    <ListItemIcon style={{ minWidth: 35 }}>
                        <Brightness1Icon style={{ color: "green", fontSize: "1rem" }} />
                    </ListItemIcon>
                    <ListItemText primary={user} />
                </ListItem>)}
            </List>
        );
    }
}

export default Sidebar;