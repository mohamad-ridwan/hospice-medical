import React, { useState, useEffect } from 'react';
import './Doctors.scss';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';

function Doctors() {

    const [dataHeaders, setDataHeaders] = useState({})
    const [dataDoctors, setDataDoctors] = useState({})
    const [idxHover, setIdxHover] = useState(null)

    function setAllAPI() {
        API.APIGetHeaderPage()
            .then(res => {
                const respons = res.data
                const headers = respons.filter((e) => e.id === "header-doctors")
                setDataHeaders(headers[0])
            })
            .catch(err => console.log(err))

        API.APIGetDoctors()
            .then(res => {
                setDataDoctors(res.data[0])
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI()
        window.scrollTo(0, 0)
    }, [])

    function mouseOver(i) {
        setIdxHover(i)
    }

    function mouseLeave() {
        setIdxHover(null)
    }

    return (
        <>
            <div className="wrapp-doctors">
                <div className="container-header">
                    {Object.keys(dataHeaders).length > 0 ? (
                        <Header
                            title={dataHeaders.title}
                            img={`${endpoint}/${dataHeaders.image}`}
                            displayIcon2="none"
                            page1="Consultants"
                            displayIcon3="none"
                        /> 
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="offered-services-doctors">
                    {Object.keys(dataDoctors).length > 0 ? (
                        <>
                            <p className="title-services-doctors">
                                {dataDoctors.title}
                            </p>
                            <p className="paragraph-services-doctors">
                                {dataDoctors.deskripsi}
                            </p>

                            <div className="column-card-services-doctors">
                                {dataDoctors && dataDoctors.data ? dataDoctors.data.map((e, i) => {
                                    return (
                                        <div key={i} className="card-services-doctors">
                                            <Card
                                                img={`${endpoint}/${e.image}`}
                                                titleImgHover={e.name}
                                                paragraphHoverImg={e.deskripsi}
                                                displayTitleHoverImg="flex"
                                                displayParagraphoverImg="flex"
                                                fontSizeTitleHoverImg="16px"
                                                paddingTitleHoverImg="0"
                                                fontWeightTitleHoverImg="bold"
                                                opacityHoverImg={i == idxHover ? '1' : '0'}
                                                dataMedsos={e.medsos}
                                                cursorImg="default"
                                                bgColorHoverImg="#3fade4d5"
                                                paddingHoverImg="20px"
                                                displayListMedsos="flex"
                                                borderTitleHoverImg="none"
                                                positionTitleHoverImg="absolute"
                                                bottomTitleHoverImg="75px"
                                                positionParagraphHoverImg="absolute"
                                                bottomParagraphHoverImg="40px"
                                                mouseOver={() => mouseOver(i)}
                                                mouseLeave={mouseLeave}
                                            />
                                        </div>
                                    )
                                }) : (
                                    <div></div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Doctors;