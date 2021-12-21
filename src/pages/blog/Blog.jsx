import React, { useState, useEffect, useContext } from 'react';
import './Blog.scss';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import PopularPosts from '../../components/popularposts/PopularPosts';
import Pagination from '../../components/pagination/Pagination';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import { useHistory } from 'react-router';
import { BlogContext } from '../../services/context/BlogContext';
import Loading from '../../components/loading/Loading';
import { NavbarContext } from '../../services/context/NavbarContext';

function Blog() {
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers, pathActiveMenuNav, setPathActiveMenuNav] = useContext(NavbarContext)
    const [filterBlog, selectBlogCategory, routeLoginFromComment, setRouteLoginFromComment, scrollTopBlog] = useContext(BlogContext)
    const [loading, setLoading] = useState(false)
    const [getHeaders, setGetHeaders] = useState({})
    const [dataImgKategori, setDataImgKategori] = useState([])
    const [contentBlog, setContentBlog] = useState([])
    const [dataPopularPosts, setDataPopularPosts] = useState([])
    const [dataPostCategories, setDataPostCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [idxPaginateActive, setIdxPaginateActive] = useState(0)
    const [loadingBottom, setLoadingBottom] = useState(false)
    const [hoverImg, setHoverImg] = useState(null)
    const [hoverBtn, setHoverBtn] = useState(null)

    const history = useHistory()
    const paginate = document.getElementsByClassName('number-pagination')

    function setAllAPI() {
        API.APIGetHeaderPage()
            .then(res => {
                const respons = res.data
                const headers = respons.filter(e => e.id === "header-blog")
                setGetHeaders(headers[0])
            })
            .catch(err => console.log(err))

        API.APIGetBlogs()
            .then(res => {
                const respons = res.data

                const imgCategory = respons.filter(e => e.idCategory === "post-categories")
                const getThreeItems = imgCategory.filter((e, i) => i < 3)
                setDataImgKategori(getThreeItems)
                setDataPostCategories(imgCategory)

                const getPopularPosts = respons.filter(e => e.id === "popular-posts")
                const getFourItems = getPopularPosts[0].data.filter((e, i) => i < 4)
                setDataPopularPosts(getFourItems)

                loadFilterBlog(filterBlog, true, scrollTopBlog)

                setTimeout(() => {
                    setLoading(false)
                }, 10);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setLoading(true)
        setPathActiveMenuNav(4)
        window.scrollTo(0, 0)

        setTimeout(() => {
            setAllAPI()
        }, 0)
    }, [])

    function loadFilterBlog(id, loadBtm, condition) {
        if (loadBtm) {
            setLoadingBottom(true)
        }

        API.APIGetBlogs()
            .then(res => {
                const respons = res.data

                const imgCategory = respons.filter(e => e.idCategory === "post-categories")

                const newData = []

                const combine = imgCategory.forEach(e => {
                    const getData = e.data.forEach(e => {
                        newData.push(e)
                    })
                    setTimeout(() => {
                        if (newData.length > 0) {
                            if (id !== undefined && id.length > 0) {
                                const filteringBlog = newData.filter(e => e.path.split('/')[0].includes(id))
                                setContentBlog(filteringBlog)
                                clickPaginate(0)
                                setLoadingBottom(false)

                                setTimeout(() => {
                                    loadActivePaginate()
                                }, 10);

                                setTimeout(() => {
                                    if (condition) {
                                        scrollToMainBlog()
                                    }
                                }, 100);
                            } else {
                                setContentBlog(newData)
                                clickPaginate(0)
                                setLoadingBottom(false)

                                setTimeout(() => {
                                    loadActivePaginate()
                                }, 10);

                                setTimeout(() => {
                                    if (condition) {
                                        scrollToMainBlog()
                                    }
                                }, 100);
                            }
                        }
                    }, 0);
                    return getData
                })
                return combine
            })
            .catch(err => console.log(err))
    }

    function scrollToMainBlog() {
        const elementContentBlog = document.getElementById('container-content-blog')
        const parentBlog = document.getElementById('parent-blog')
        if (elementContentBlog) {
            const positionTopBlog = Math.floor(elementContentBlog.getBoundingClientRect().top - parentBlog.getBoundingClientRect().top)

            window.scrollTo(0, positionTopBlog)
        }
    }

    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentList = contentBlog.slice(indexOfFirstPage, indexOfLastPage);

    function loadActivePaginate() {
        if (paginate.length > 0) {
            paginate[0].style.backgroundColor = '#3face4';
            paginate[0].style.border = '1px solid #3face4';
            paginate[0].style.color = '#fff';
        }
    }

    function RenderParagraphSatu({ paragraphSatu }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: paragraphSatu.length > 300 ? paragraphSatu.substr(0, 300) + '...' : paragraphSatu }}></p>
        )
    }

    function mouseOverBtnContent(i) {
        setHoverBtn(i)
    }

    function mouseLeaveBtnContent() {
        setHoverBtn(null)
    }

    function mouseOverImg(i) {
        setHoverImg(i)
    }

    function mouseLeaveImg() {
        setHoverImg(null)
    }

    function clickPaginate(idx) {
        setIdxPaginateActive(idx)
        setCurrentPage(idx + 1)

        if (paginate.length > 0) {
            for (let i = 0; i < paginate.length; i++) {
                paginate[i].style.backgroundColor = 'transparent';
                paginate[i].style.border = '1px solid #eee';
                paginate[i].style.color = '#777';
            }

            paginate[idx].style.backgroundColor = '#3face4';
            paginate[idx].style.border = '1px solid #3face4';
            paginate[idx].style.color = '#fff';
        }
    }

    const elementPostCategories = document.getElementsByClassName('list-post-categories')
    const elementFromFilter = document.getElementsByClassName(filterBlog)

    function toPage(path) {
        history.push(path)
    }

    function activeListCategories(condition, conditionMouseOver, idxMouseOver) {
        if (condition) {
            if (elementPostCategories.length > 0) {
                for (let i = 0; i < elementPostCategories.length; i++) {
                    elementPostCategories[i].style.color = "#777"
                    elementPostCategories[i].style.borderBottom = "2px dotted #eee"
                }
            }
            if (elementFromFilter.length > 0) {
                elementFromFilter[0].style.color = "#3face4"
                elementFromFilter[0].style.borderBottom = "2px dotted #3face4"
            }

            if (conditionMouseOver) {
                elementPostCategories[idxMouseOver].style.color = "#3face4"
                elementPostCategories[idxMouseOver].style.borderBottom = "2px dotted #3face4"
            }
        }
    }

    setTimeout(() => {
        activeListCategories(filterBlog.length > 0)
    }, 0);

    function mouseOverListCategories(idx) {
        activeListCategories(true, true, idx)
    }

    function mouseLeaveListCategories() {
        activeListCategories(true)
    }

    return (
        <>
            <div className="wrapp-blog" id="parent-blog">
                <div className="container-header">
                    {Object.keys(getHeaders).length > 0 ? (
                        <Header
                            title={getHeaders.title}
                            img={`${endpoint}/${getHeaders.image}`}
                            displayIcon2="none"
                            page1="Blog"
                            displayIcon3="none"
                        />
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="column-card-img-blog">
                    {dataImgKategori && dataImgKategori.length > 0 ? dataImgKategori.map((e, i) => {
                        return (
                            <div key={i} className="card-img-blog">
                                <Card
                                    img={`${endpoint}/${e.image}`}
                                    titleImgHover={e.title.toUpperCase()}
                                    paragraphHoverImg={e.deskripsi}
                                    heightImg="100%"
                                    opacityHoverImg="1"
                                    marginHoverImg="20px"
                                    fontSizeTitleHoverImg="16px"
                                    fontWeightTitleHoverImg="bold"
                                    displayTitleHoverImg="flex"
                                    bgColorHoverImg={i == hoverImg ? '#3fade491' : 'rgba(0,0,0,0.5)'}
                                    displayParagraphoverImg="flex"
                                    paddingTitleHoverImg="0 0px 5px 0px"
                                    paddingHoverImg="40px"
                                    borderTitleHoverImg="none"
                                    borderTopParagraphHoverImg="1px solid #fff"
                                    paddingParagraphHoverImg="10px 0 0 0"
                                    marginParagraphHoverImg="10px 0 0 0"
                                    mouseOver={() => mouseOverImg(i)}
                                    mouseLeave={mouseLeaveImg}
                                    clickWrapp={() => {
                                        selectBlogCategory(e.id)
                                        loadFilterBlog(e.id, true, true)
                                    }}
                                />
                            </div>
                        )
                    }) : (
                        <div></div>
                    )}
                </div>

                <div className="container-content-blog" id="container-content-blog">
                    <div className="column-kiri-content-blog">
                        {currentList && currentList.length > 0 ? currentList.map((e, i) => {
                            return (
                                <div key={i} className="column-card-content-blog">
                                    <div className="date-content-blog">
                                        <p className="name-kategori-content date-group-content">
                                            Category, {e.category}
                                        </p>
                                        <p className="date-content-clock date-group-content">
                                            {e.clock}

                                            <i className="far fa-clock"></i>
                                        </p>
                                        <p className="date-content-publish date-group-content">
                                            {e.date}

                                            <i className="far fa-calendar-alt"></i>
                                        </p>
                                        <p className="total-comment-content date-group-content">
                                            {e.comments.length} Comments

                                            <i className="far fa-comment"></i>
                                        </p>
                                    </div>

                                    <div className="card-content-blog">
                                        <Card
                                            displayContentCard="flex"
                                            img={`${endpoint}/${e.image}`}
                                            title={e.title}
                                            paragraph={<RenderParagraphSatu paragraphSatu={e.paragraphSatu} />}
                                            heightImg="auto"
                                            colorBtn={i == hoverBtn ? '#fff' : '#000'}
                                            bgColorBtn={i == hoverBtn ? '#3face4' : 'transparent'}
                                            borderBtn={i == hoverBtn ? '1px solid #3face4' : '1px solid #eee'}
                                            fontSizeTitle="22px"
                                            cursorTitle="pointer"
                                            nameBtn="View More"
                                            displayBtn="flex"
                                            paddingBtn="10px 30px"
                                            bgColorWrapp="transparent"
                                            cursorImg="default"
                                            mouseOverBtn={() => mouseOverBtnContent(i)}
                                            mouseLeaveBtn={mouseLeaveBtnContent}
                                            clickBtn={() => toPage(`/blog/blog-details/${e.path}`)}
                                            clickTitle={() => toPage(`/blog/blog-details/${e.path}`)}
                                        />
                                    </div>
                                </div>
                            )
                        }) : (
                            <div></div>
                        )}

                        <Pagination
                            perPage={perPage}
                            totalData={contentBlog.length}
                            idxPaginateActive={idxPaginateActive}
                            click={async (i) => {
                                clickPaginate(i)
                                await scrollToMainBlog()
                            }}
                        />
                    </div>

                    <PopularPosts
                        dataPopularPosts={dataPopularPosts}
                        dataPostCategories={dataPostCategories}
                        btnListPostCategories={(id) => {
                            selectBlogCategory(id)
                            loadFilterBlog(id, true, true)
                        }}
                        clickPopularPosts={(path) => toPage(`/blog/blog-details/${path}`)}
                        mouseOver={(idx) => mouseOverListCategories(idx)}
                        mouseLeave={mouseLeaveListCategories}
                    />
                </div>

                <Loading
                    displayLoadingPage={loading ? 'flex' : 'none'}
                    displayLoadingBottom="flex"
                    rightLoadingBottom={loadingBottom ? '40px' : '-1000px'}
                />
            </div>
        </>
    )
}

export default Blog;