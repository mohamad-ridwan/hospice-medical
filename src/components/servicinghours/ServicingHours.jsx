import React from 'react';
import './ServicingHours.scss';
import Input from '../input/Input';
import Button from '../button/Button';

function ServicingHours({dateServicing, widthWrapp, positionWrapp, paddingWrapp, topBook, bottomBook, marginWrapp}){
    return(
        <>
        <div className="wrapp-card-book-an-appointment" style={{
            width: widthWrapp,
            position: positionWrapp,
            padding: paddingWrapp,
            margin: marginWrapp
        }}>
                    <div className="container-book-an-appointment">
                        <div className="servicing-hours">
                            <p className="title-servicing">
                                Servicing Hours
                            </p>
                            <p className="paragraph-servicing">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>

                            <div className="column-date-servicing">
                                {dateServicing && dateServicing.length > 0 ? dateServicing.map((e)=>{
                                    return(
                                        <div className="date-servicing">
                                            <p className="name-day">
                                                {e.day}
                                            </p>

                                            <p className="clock-time">
                                                {e.time}
                                            </p>
                                        </div>
                                    )
                                }):(
                                    <div></div>
                                )}
                            </div>
                        </div>

                        <div className="book-an-appointment" style={{
                                top: topBook,
                                bottom: bottomBook
                            }}>
                                <p className="title-book-an-appointment">
                                    Book an Appointment
                                </p>

                                <form action="" className="form-book-an-appointment">
                                    <Input
                                    type="text"
                                    placeholder="Patient Name"
                                    />
                                    <Input
                                    type="tel"
                                    placeholder="Phone"
                                    />
                                    <Input
                                    type="email"
                                    placeholder="Email Address"
                                    />
                                    <Input
                                    type="text"
                                    placeholder="Date of Birth"
                                    />
                                    <Input
                                    displayTxtInput="none"
                                    displayBtnInput="flex"
                                    nameBtn="Disease Type"
                                    />
                                    <Input
                                    type="text"
                                    placeholder="Appointment Date"
                                    />
                                    <Input
                                    displayTxtInput="none"
                                    displayTxtArea="flex"
                                    placeholderTxtArea="Messege"
                                    resizeTxtArea="none"
                                    />

                                    <div className="column-btn-submit">
                                        <Button
                                        nameBtn="CONFIRM BOOKING"
                                        />
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
        </>
    )
}

export default ServicingHours;