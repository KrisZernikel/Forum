import React, { useState } from 'react'

const styles = {
  textarea: {
    boxSizing: 'border-box',
    maxWidth: '438px',
    width: '100%',
    height: '32px',
    padding: '8px 12px',
    border: '1px solid #ccd0d5',
    borderRadius: '16px',
    fontSize: '13px'
  }
}
export default () => {
  const [reply, setReply] = useState('')
  return (
    <div style={{ width: '100%' }}>
      <textarea
        style={styles.textarea}
        placeholder='Write a reply...'
        onChange={e => setReply(e.target.value)}
      />
    </div>
  )
}
