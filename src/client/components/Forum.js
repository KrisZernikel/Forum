import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PostBox from './PostBox'
import List from '@material-ui/core/List'
import PostItem from './PostItem'

import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default ({ signOut, post, user, src }) => {
  const [posts, setPosts] = useState([])
  const [comment, setComment] = useState('')

  const handleDelete = async item => {
    const _deletePost = async () => {
      await axios({
        method: 'post',
        url: '/api/dynamo/delete-post',
        data: {
          Email: item.Email,
          TimeStamp: item.TimeStamp
        }
      })
    }
    await _deletePost()

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
      setPosts(response.data.Items)
    }
    await _scanPosts()
  }
  const handlePost = async () => {
    await post({ email, post: comment })
    setComment('')

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
      setPosts(response.data.Items)
    }
    await _scanPosts()
  }
  const classes = useStyles()
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
      setPosts(response.data.Items)
    }
    _saveUser()
    _scanPosts()
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Forum
          </Typography>
          <Button color='inherit' onClick={signOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem'
        }}
      >
        <PostBox
          user={user}
          email={email}
          src={src}
          post={post}
          comment={comment}
          setComment={setComment}
          handlePost={handlePost}
        />
        <List style={{ maxWidth: '500px', width: '100%' }}>
          {posts.map((item, index) => (
            <PostItem
              key={index}
              user={user}
              item={item}
              handleDelete={handleDelete}
            />
          ))}
        </List>
      </main>
    </div>
  )
}
