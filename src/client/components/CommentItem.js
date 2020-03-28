import React from 'react'
import Paper from '@material-ui/core/Paper';

export default ({ firstName, lastName, comment }) => {
    return (
        <Paper key component="li" style={{ boxSizing: "border-box", width: "500px", minHeight: "5rem", marginBottom: "10px", padding: "1rem", wordWrap: "break-word" }}>
            <div>
                <div>
                    {`${firstName} ${lastName}`}
                </div>
                <div>
                    {comment}
                </div>
            </div>
        </Paper>
    )
}