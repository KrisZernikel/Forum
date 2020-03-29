import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default ({ user, item }) => {
    const [commentUser, setCommentUser] = useState({})
    useEffect(() => {
        const _call = async () => {
            const response = await axios({
                method: "post",
                url: "/api/dynamo/query-email",
                data: {
                    email: item.Email
                }
            })
            setCommentUser(response.data.Items[0])
        }
        _call()
    }, [])
    return (
        <Paper key component="li" style={{ boxSizing: "border-box", width: "500px", minHeight: "5rem", marginBottom: "10px", padding: "1rem", wordWrap: "break-word" }}>
            <div>
                <div>
                    {`${commentUser.FirstName} ${commentUser.LastName}`}
                </div>
                <div>
                    {item.Post}
                </div>
                <div style={{ boxSizing: "border-box", width: "100%", display: "inline-flex", justifyContent: "flex-end", padding: "1rem" }}>
                    {user._json.email === item.Email ? <Button>Delete</Button> : null}
                </div>
            </div>
        </Paper>
    )
}