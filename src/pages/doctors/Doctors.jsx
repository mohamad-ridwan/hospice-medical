import React, {useState} from 'react';
import './Doctors.scss';
import img from '../../images/banner-home.jpg'
import Header from '../../components/header/Header';
import categorySatu from '../../images/category-satu.jpg';
import categoryDua from '../../images/category-dua.jpg';
import categoryTiga from '../../images/category-tiga.jpg';
import Card from '../../components/card/Card';

function Doctors(){

    const [imgDoctors, setImgDoctors] = useState([
        {
            img: categorySatu,
            title: ''
        },
        {
            img: categoryDua,
            title: ''
        },
        {
            img: categoryTiga,
            title: ''
        },
        {
            img: categorySatu,
            title: ''
        },
        {
            img: categoryDua,
            title: ''
        },
        {
            img: categoryTiga,
            title: ''
        },
    ])

    return(
        <>
        <div className="wrapp-doctors">
            <div className="container-header">
                <Header
                    title="Consultants"
                    img={img}
                    displayIcon2="none"
                    page1="Consultants"
                    displayIcon3="none"
                />
            </div>

            <div className="offered-services-doctors">
                <p className="title-services-doctors">
                    Our Offered Services
                </p>
                <p className="paragraph-services-doctors">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="column-card-services-doctors">
                    {imgDoctors.map((e)=>{
                        return(
                            <div className="card-services-doctors">
                                <Card 
                                    img={e.img}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default Doctors;