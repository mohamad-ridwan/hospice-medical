import React from 'react'
import './ProfileNav.scss'

function ProfileNav({
    onMouseOver,
    onMouseLeave,
    imgSrc,
    nameProfile,
    children
}) {
    return (
        <div className="profile-nav"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        >
            <img src={imgSrc} alt="" className="img-profile" />
            <p className="name-profile">
                {nameProfile}
            </p>
            {children}
        </div>
    )
}

export default ProfileNav