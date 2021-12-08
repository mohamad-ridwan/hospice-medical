import React, { useState, useEffect, useContext } from 'react';
import './Departments.scss';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import Loading from '../../components/loading/Loading';
import { NavbarContext } from '../../services/context/NavbarContext';

function Departments() {
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers, pathActiveMenuNav, setPathActiveMenuNav] = useContext(NavbarContext)
    const [loading, setLoading] = useState(false)
    const [dataHeaders, setDataHeaders] = useState({})
    const [dataProcedure, setDataProcedure] = useState({})
    const [hoverProcedureCtg, setHoverProcedureCtg] = useState(null)

    function setAllAPI() {
        API.APIGetHeaderPage()
            .then(res => {
                const respons = res.data

                const headers = respons.filter((e) => e.id === "header-departments")
                setDataHeaders(headers[0])
            })
            .catch(err => console.log(err))

        API.APIGetProcedureCategory()
            .then(res => {
                setDataProcedure(res.data[0])

                setTimeout(() => {
                    setLoading(false)
                }, 10);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setLoading(true)
        setPathActiveMenuNav(1)
        window.scrollTo(0, 0)

        setTimeout(() => {
            setAllAPI()
        }, 0)
    }, [])

    function mouseOverProcedureCtg(i) {
        setHoverProcedureCtg(i)
    }

    function mouseLeaveProcedureCtg() {
        setHoverProcedureCtg(null)
    }

    return (
        <>
            <div className="wrapp-departments">
                <div className="container-header">
                    {Object.keys(dataHeaders).length > 0 ? (
                        <>
                            <Header
                                title={dataHeaders.title}
                                img={`${endpoint}/${dataHeaders.image}`}
                                displayIcon2="none"
                                page1="Departments"
                                displayIcon3="none"
                            />
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="procedure-category-departments">
                    {Object.keys(dataProcedure).length > 0 ? (
                        <>
                            <p className="title-procedure-departments">
                                {dataProcedure.title}
                            </p>
                            <p className="paragraph-procedure-departments">
                                {dataProcedure.deskripsi}
                            </p>

                            <div className="column-card-procedure-departments">
                                {dataProcedure && dataProcedure.dataImg.length > 0 ? dataProcedure.dataImg.map((e, i) => {
                                    return (
                                        <div key={i} className="card-procedure-departments">
                                            <Card
                                                img={`${endpoint}/${e.image}`}
                                                titleImgHover={e.title}
                                                marginHoverImg="20px"
                                                paddingHoverImg="40px"
                                                fontSizeTitleHoverImg="16px"
                                                displayTitleHoverImg="flex"
                                                fontWeightTitleHoverImg="bold"
                                                paddingTitleHoverImg="10px 0"
                                                widthTitleHoverImg="auto"
                                                opacityHoverImg={i === hoverProcedureCtg ? '1' : '0'}
                                                mouseOver={() => mouseOverProcedureCtg(i)}
                                                mouseLeave={mouseLeaveProcedureCtg}
                                                cursorImg="default"
                                                justifyContentTitleHoverImg="center"
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

                <Loading displayLoadingPage={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default Departments;