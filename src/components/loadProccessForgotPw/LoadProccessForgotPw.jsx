import React from 'react'
import './LoadProccessForgotPw.scss'

function LoadProccessForgotPw({
    loading,
    text
}) {
  return (
    <div className="container-loading" style={{
        display: loading ? 'flex' : 'none'
    }}>
        <div className="loading-circle"></div>
        <p className="waiting">
            {text}
        </p>
    </div>
  )
}

export default LoadProccessForgotPw