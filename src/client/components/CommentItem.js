import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import moment from 'moment'

export default ({ user, item, handleDelete }) => {
  const [commentUser, setCommentUser] = useState({})
  const datetime = moment(item.TimeStamp)

  useEffect(() => {
    const _call = async () => {
      const response = await axios({
        method: 'post',
        url: '/api/dynamo/query-email',
        data: {
          email: item.Email
        }
      })
      setCommentUser(response.data.Items[0])
    }
    _call()
  }, [])
  return (
    <Paper
      key
      component='li'
      style={{
        boxSizing: 'border-box',
        maxWidth: '500px',
        minHeight: '5rem',
        marginBottom: '10px',
        padding: '1rem',
        wordWrap: 'break-word'
      }}
    >
      <div>
        <Typography variant='subtitle1' component='p'>
          {`${commentUser.FirstName} ${commentUser.LastName}`}
        </Typography>
        <Typography
          variant='subtitle1'
          component='p'
          style={{ paddingBottom: '12px' }}
        >
          {`${datetime.format('MMMM DD')} at ${
            datetime.format('hh:mm').substring(0, 1) === '0'
              ? datetime
                  .format('hh:mm')
                  .substring(1, datetime.format('hh:mm').length)
              : datetime.format('hh:mm')
          }`}
        </Typography>
        <Typography variant='subtitle1' component='p'>
          {item.Post}
        </Typography>
        <div
          style={{
            boxSizing: 'border-box',
            width: '100%',
            display: 'inline-flex',
            justifyContent: 'flex-end',
            padding: '1rem'
          }}
        >
          {user._json.email === item.Email ? (
            <Button onClick={() => handleDelete(item)}>Delete</Button>
          ) : null}
        </div>
      </div>
    </Paper>
  )
}
