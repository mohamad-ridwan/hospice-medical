import React from 'react'
import './ProfileCollapse.scss'

function ProfileCollapse({
    styleWrapp,
    clickMenu,
    menuData
}) {
    return (
        <div className='profile-collapse' style={styleWrapp}>
            {menuData?.length && menuData?.map((menu, index) => {
                return (
                    <li key={index} className={`menu-register ${menu.className}`}
                        onClick={() => clickMenu(menu.path)}
                    >
                        {menu.nameMenu}
                    </li>
                )
            })}
        </div>
    )
}

export default ProfileCollapse