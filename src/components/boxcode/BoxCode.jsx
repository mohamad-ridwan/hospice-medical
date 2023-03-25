import React from 'react'
import './BoxCode.scss'

function BoxCode({clickInput, name, value, changeInput, id, borderBottom}) {
    return (
        <div className='box-code' onClick={clickInput} id={id}>
            <input type="text" name={name} value={value} maxLength={1} onChange={changeInput} style={{
                borderBottom: borderBottom
            }}/>
        </div>
    )
}

export default BoxCode