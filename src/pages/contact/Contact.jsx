import React, {useState, useEffect} from 'react';
import {Loader, LoaderOptions} from 'google-maps'
import './Contact.scss';
import Header from '../../components/header/Header';
import img from '../../images/banner-home.jpg'
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

function Contact(){

    const [listContact, setListContact] = useState([
        {
            icon: 'fas fa-home',
            title: 'California, United States',
            paragraph :'Santa monica bullevard'
        },
        {
            icon: 'fas fa-phone',
            title: '081 383 959 452',
            paragraph :'Santa monica bullevard'
        },
        {
            icon: 'fas fa-envelope',
            title: 'mr643062@gmail.com',
            paragraph :'Send us your query anytime!'
        }
    ])

    const lat = -6.454882
    const lng = 106.795199
    const APIKey = 'AIzaSyAdmoWMT0t7Gj1EButLm35pQJ9BhiG6ZL0'

    useEffect(()=>{
        initMap();
    }, [])

    async function initMap(){
        const loader = new Loader(APIKey, LoaderOptions);

        const google = await loader.load();

        const map = new google.maps.Map(document.getElementsByClassName('column-google-maps')[0], {
            center: {lat: lat, lng: lng},
            zoom: 8
        })

        return map;
    }

    return (
        <>
        <div className="wrapp-contact">
            <div className="container-header">
                <Header
                    title="Contact Us"
                    img={img}
                    displayIcon2="none"
                    page1="Contact Us"
                    displayIcon3="none"
                />
            </div>

            <div className="container-content-contact">
                <div className="column-google-maps">

                </div>

                <div className="column-info-contact-us">
                    <div className="info-contact-us-group">
                        {listContact.map((e, i)=>{
                            return(
                                <div className="column-address-contact">
                                    <i className={e.icon}></i>

                                    <div className="list-address-contact">
                                        <p className="title-address-contact" style={{
                                            cursor: i !== 0 ? 'pointer' : 'input'
                                        }}>
                                            {e.title}
                                        </p>
                                        <p className="paragraph-address-contact">
                                            {e.paragraph}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="info-contact-us-group">
                        <Input
                        type="text"
                        placeholder="Enter your name"
                        />
                        <Input
                        type="email"
                        placeholder="Enter email address"
                        />
                        <Input
                        type="text"
                        placeholder="Enter Subject"
                        />
                    </div>

                    <div className="info-contact-us-group">
                        <Input
                        displayTxtArea="flex"
                        displayTxtInput="none"
                        placeholderTxtArea="Enter Message"
                        resizeTxtArea="none"
                        />

                        <div className="column-btn-submit-contact-us">
                            <Button
                            nameBtn="Send Message"
                            padding="12px 40px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Contact;