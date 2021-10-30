import React, {useState} from 'react';
import './Footer.scss';
import Input from '../input/Input';
import Button from '../button/Button';

function Footer(){

    const [hoverBtnSubmit, setHoverBtnSubmit] = useState(false)

    function mouseOverBtnSubmit(){
        setHoverBtnSubmit(true)
    }

    function mouseLeaveBtnSubmit(){
        setHoverBtnSubmit(false)
    }

    return(
        <>
        <div className="wrapp-footer">
            <div className="column-contact-us">
                <div className="contact-us">
                    <p className="title-contact-us-group">
                        Contact Us
                    </p>
                    <p className="paragraph-contact-us-group">
                        56/8, Santa bullevard, Rocky beach, San fransisco, Los angeles, USA
                    </p>

                    <ul>
                        <li className="no-telp">
                            <a href="tel:+6281383959452" className="to-contact">
                                081-383-959-452
                            </a>
                        </li>
                        <li className="no-telp">
                            <a href="tel:+6289611683455" className="to-contact">
                                089-611-683-455
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="newsletter">
                    <p className="title-contact-us-group">
                        Newsletter
                    </p>
                    <p className="paragraph-contact-us-group">
                        You can trust us. we only send promo offers, not a single spam.
                    </p>

                    <form action="" className="form-input-email-newsletter">
                        <Input
                            type="email"
                            placeholder="Your Email Address"
                            bgColorInputCard="#2d2d2d"
                            borderInputCard="1px solid #2d2d2d"
                            colorInputCard="#fff"
                            bdrRadiusInputCard="100px"
                            paddingInputCard="12px 15px"
                            widthInputCard="55%"
                            marginInputCard="0"
                        />
                        
                        <div className="column-btn-submit-newsletter">
                            <Button
                            nameBtn="Get Started"
                            bgColor={hoverBtnSubmit ? 'transparent' : '#3face4'}
                            color={hoverBtnSubmit ? '#3face4' : '#fff'}
                            bdrRadius="100px"
                            padding="12px 40px"
                            displayIcon="flex"
                            icon="fas fa-long-arrow-alt-right"
                            mouseOver={mouseOverBtnSubmit}
                            mouseLeave={mouseLeaveBtnSubmit}
                            />
                        </div>
                    </form>
                </div>
            </div>

            <div className="column-copy-right">
                <p className="copy-right">
                    © 2021 Hospice Medical. Developed by <p className="name-developer">
                    Ridwan
                </p>
                </p>

                <ul>
                    <li className="list-medsos">
                        <a target="_blank" href="" className="link-medsos">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li className="list-medsos">
                        <a target="_blank" href="" className="link-medsos">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li className="list-medsos">
                        <a target="_blank" href="" className="link-medsos">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Footer;