import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PostBox from './PostBox';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import CommentItem from './CommentItem';

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

export default ({ signOut, post, user, src }) => {
    const [posts, setPosts] = useState([])
    const [comment, setComment] = useState("")
    const handlePost = async () => {
        await post({ email, post: comment })
        setComment("")

        const _scanPosts = async () => {
            let response
            try {
                response = await axios({
                    method: 'get',
                    url: '/api/dynamo/scan-posts'
                })
            } catch (e) {
                console.log(e)
            }
            setPosts(response.data.Items.reverse())
        }
        await _scanPosts()
    }
    const classes = useStyles();
    const { email } = user._json
    useEffect(() => {
        const _saveUser = async () => {
            await axios({
                method: 'post',
                url: '/api/dynamo/save-user',
                data: {
                    email: user.emails[0].value,
                    firstName: user._json.first_name,
                    lastName: user._json.last_name
                }
            })
        }
        const _scanPosts = async () => {
            let response
            try {
                response = await axios({
                    method: 'get',
                    url: '/api/dynamo/scan-posts'
                })
            } catch (e) {
                console.log(e)
            }
            setPosts(response.data.Items.reverse())
        }
        _saveUser()
        _scanPosts()
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
                <PostBox
                    email={email}
                    src={src}
                    post={post}
                    comment={comment}
                    setComment={setComment}
                    handlePost={handlePost}
                />
                <List>
                    {
                        posts.map((item, index) => <CommentItem 
                        key={index}
                        firstName={user._json.first_name}
                        lastName={user._json.last_name}
                        comment={item.Post} 
                        />)
                    }
                </List>
            </main>
        </div>
    )
}