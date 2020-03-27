import React from 'react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = {
    postBox: {
        boxSizing: "border-box",
        width: "500px",
        display: "flex",
        flexDirection: "column"
    },
    textarea: {
        boxSizing: "border-box",
        width: "448px",
        padding: "18px 48px 13px 12px",
        display: "inline-flex"
    }
}

export default ({ src }) => {
    return (
        <Paper elevation={3} style={styles.postBox}>
            <div style={{ borderBox: "border-box", height: "87px", display: "flex" }}>
                <div style={{ width: "52px", display: "inline-flex", justifyContent: "center", justifyContent: "flex-end" }}>
                    <img width="40" height="40" src={src} alt="" style={{ borderRadius: "50%", position: "relative", top: "12px" }} />
                </div>
                <textarea style={styles.textarea} />
            </div>
            <div style={{borderBox: "box-sizing", padding: "0 12px 10px"}}>
                <Button size="small" variant="contained" color="primary" style={{width: "100%"}}>
                    Post
                </Button>
            </div>
        </Paper>
    )
}
