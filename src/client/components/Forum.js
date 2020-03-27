import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PostBox from './PostBox';

import axios from 'axios';

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

export default ({ user, signOut, src }) => {
    const classes = useStyles();
    useEffect(() => {
        const _saveUser = async () => {
            console.log(user._json.first_name)
            await axios({
                method: 'put',
                url: '/api/dynamo/save-user',
                data: {
                    email: user.emails[0].value,
                    firstName: user._json.first_name,
                    lastName: user._json.last_name
                }
            })
        }
        _saveUser()
    }, [])
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Forum
                    </Typography>
                    <Button color="inherit" onClick={signOut}>Sign out</Button>
                </Toolbar>
            </AppBar>
            <main style={{ padding: "1rem" }}>
                <PostBox src={src} />
            </main>
        </div>
    )
}