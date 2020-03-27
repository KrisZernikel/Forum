import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const styles = {
    loginBox: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "0px",
        left: "0px"
    },
    loginPaper: {
        width: "300px",
        height: "400px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column"
    }
}

export default () => {
    const [open, setOpen] = useState(false)
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Forum
                    </Typography>
                    <Button color="inherit" onClick={() => setOpen(!open)}>Sign in</Button>
                </Toolbar>
            </AppBar>
            <div style={{...styles.loginBox, visibility: open ? "visible" : "hidden" }}>
                <Paper elevation={3} style={styles.loginPaper}>
                    <Button href="/login/facebook" size="small" variant="contained" color="primary">
                        Sign in with Facebook
                    </Button>
                </Paper>
            </div>
        </>
    )
}