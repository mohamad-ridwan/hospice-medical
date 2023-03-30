import React from 'react'
import './BioProfile.scss'
import Input from '../input/Input'

function BioProfile({
    icon,
    labelName,
    name,
    value,
    disabledInput,
    errorMessage,
    changeInput
}) {
    return (
        <div className="bio-profile-card">
            <div className="bio-icon">
                <i className={icon}></i>
            </div>

            <div className="bio-input-profile">
                <label htmlFor="">
                    <span>{labelName}</span>
                </label>
                <Input
                    type="text"
                    displayErrorMsg="flex"
                    nameInput={name}
                    paddingInputCard="6px 0px"
                    classInputCard="input-card-profile"
                    valueInput={value}
                    disabledInput={disabledInput}
                    changeInput={changeInput}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    )
}

export default BioProfile