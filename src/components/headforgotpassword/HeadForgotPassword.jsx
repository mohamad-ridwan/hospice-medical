import React from 'react'
import './HeadForgotPassword.scss'

function HeadForgotPassword({
    icon,
    title,
    desc,
    styleIcon
}) {
    return (
        <>
            <div className="icon" style={styleIcon}>
                <i className={icon}></i>
            </div>

            <h1 className="title-forgot-password">
                {title}
            </h1>
            <p className="desc">
                {desc}
            </p>
        </>
    )
}

export default HeadForgotPassword