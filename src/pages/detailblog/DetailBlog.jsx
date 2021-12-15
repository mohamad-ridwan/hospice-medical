import React, { useState, useEffect, useContext } from 'react';
import './DetailBlog.scss';
import Header from '../../components/header/Header';
import PopularPosts from '../../components/popularposts/PopularPosts';
import Card from '../../components/card/Card';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import { useHistory } from 'react-router';
import { BlogContext } from '../../services/context/BlogContext';
import Loading from '../../components/loading/Loading';
import { NavbarContext } from '../../services/context/NavbarContext';

function DetailBlog() {
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers, pathActiveMenuNav, setPathActiveMenuNav] = useContext(NavbarContext)
    const [filterBlog, selectBlogCategory, routeLoginFromComment, setRouteLoginFromComment, scrollTopBlog] = useContext(BlogContext)
    const [loading, setLoading] = useState(false)
    const [dataHeaders, setDataHeaders] = useState({})
    const [dataDetailBlog, setDataDetailBlog] = useState({})
    const [dataPopularPosts, setDataPopularPosts] = useState([])
    const [dataPostCategories, setDataPostCategories] = useState([])
    const [_idDocument, set_IdDocument] = useState('')
    const [idBlog, setIdBlog] = useState('')
    const [listUserComments, setListUserComments] = useState([])
    const [loadingPost, setLoadingPost] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})
    const [inputComment, setInputComment] = useState({
        subject: '',
        message: '',
    })
    const [nextAndPrevPosts, setNextAndPrevPosts] = useState([])
    const [loadingBottom, setLoadingBottom] = useState(false)

    const location = window.location.pathname
    const history = useHistory()
    const hoverBgImgPaginate = document.getElementsByClassName('hover-paginate-blog-details')

    function setAllAPI(pathLocal, loadingPaginate, onSuccessComments) {
        API.APIGetHeaderPage()
            .then(res => {
                const respons = res.data
                const headers = respons.filter(e => e.id === "header-blog-details")
                setDataHeaders(headers[0])
            })
            .catch(err => console.log(err))

        API.APIGetBlogs()
            .then(res => {
                const respons = res.data
                const idLocation = location.split('/')[3]
                const pathLocation = location.split('blog/blog-details/')[1]
                const getIdLocal = pathLocal !== undefined ? pathLocal.split('/')[0] : null

                if (pathLocal !== undefined) {
                    const getDataFromLocation = respons.filter((e) => e.id === getIdLocal)
                    const getDetailData = getDataFromLocation[0].data.filter((e) => e.path === pathLocal)
                    setDataDetailBlog(getDetailData[0])
                    set_IdDocument(getDataFromLocation[0]._id)
                    setIdBlog(getDetailData[0].id)
                    setListUserComments(getDetailData[0].comments)

                    // filter content prev post and next post
                    nextOrPrevContent(respons, getIdLocal, getDataFromLocation, getDetailData[0].id)

                    if (onSuccessComments) {
                        successComments()
                    }
                } else {
                    const getDataFromLocation = respons.filter((e) => e.id === idLocation)

                    const getDetailData = getDataFromLocation[0].data.filter((e) => e.path === pathLocation)
                    setDataDetailBlog(getDetailData[0])
                    set_IdDocument(getDataFromLocation[0]._id)
                    setIdBlog(getDetailData[0].id)
                    setListUserComments(getDetailData[0].comments)

                    // filter content prev post and next post
                    nextOrPrevContent(respons, idLocation, getDataFromLocation, getDetailData[0].id)

                    if (onSuccessComments) {
                        successComments()
                    }
                }

                const getPopularPosts = respons.filter((e) => e.id === 'popular-posts')
                const getFourItems = getPopularPosts[0].data.filter((e, i) => i < 4)
                setDataPopularPosts(getFourItems)

                const getPostCategory = respons.filter((e) => e.idCategory === "post-categories")
                setDataPostCategories(getPostCategory)

                setTimeout(() => {
                    setLoading(false)
                }, 10);

                if (loadingPaginate) {
                    setLoadingBottom(false)
                    window.scrollTo(0, 0)
                }
            })
            .catch(err => console.log(err))
    }

    function successComments() {
        setTimeout(() => {
            setInputComment({
                subject: '',
            })

            const parentPosition = document.getElementById('wrapp').getBoundingClientRect()
            const commentPosition = document.getElementById('total-comments').getBoundingClientRect()
            const roundUp = Math.floor(commentPosition.top - parentPosition.top)

            setLoadingPost(false)
            window.scrollTo(0, roundUp)
        }, 10);
    }

    useEffect(() => {
        setLoading(true)
        setPathActiveMenuNav(null)
        window.scrollTo(0, 0)

        setTimeout(() => {
            setAllAPI()
        }, 0)
    }, [])

    async function nextOrPrevContent(data, idLocal, categoryContentInPage, idDetailBlog) {
        let newArr = []
        let idxCategoryInPage = null
        let newIdxDetailBlog = null

        const indexCategoryBlog = data.map((e, i) => e.id === idLocal ? idxCategoryInPage = i : null)
        const indexDetailBlog = categoryContentInPage[0].data.map((e, i) => e.id === idDetailBlog ? newIdxDetailBlog = i : null)

        const totalBlogInPage = categoryContentInPage[0].data.length

        const getPrevPost = await data.filter((e, i) => i === idxCategoryInPage - 1)
        const getNextPost = await data.filter((e, i) => i === idxCategoryInPage + 1)

        setTimeout(() => {
            if (totalBlogInPage === 1) {
                if (getPrevPost.length === 0) {
                    const getMainContent = data.filter((e, i) => i === data.length - 1)
                    newArr.push(getMainContent[0].data[getMainContent[0].data.length - 1], getNextPost[0].data[0])
                }

                if (getNextPost.length === 0) {
                    const getMainContent = data.filter((e, i) => i === 0)
                    newArr.push(getPrevPost[0].data[getPrevPost[0].data.length - 1], getMainContent[0].data[0])
                }

                if (getPrevPost.length !== 0 && getNextPost.length !== 0) {
                    newArr.push(getPrevPost[0].data[getPrevPost[0].data.length - 1], getNextPost[0].data[0])
                }

                setNextAndPrevPosts(newArr)
            } else if (totalBlogInPage > 1) {
                const getPrevPostInCtg = categoryContentInPage[0].data.filter((e, i) => i === newIdxDetailBlog - 1)
                const getNextPostInCtg = categoryContentInPage[0].data.filter((e, i) => i === newIdxDetailBlog + 1)

                if (getPrevPostInCtg.length === 0) {
                    if (getPrevPost.length === 0) {
                        const getMainContent = data.filter((e, i) => i === data.length - 1)
                        newArr.push(getMainContent[0].data[getMainContent[0].data.length - 1], getNextPostInCtg[0])
                    } else {
                        newArr.push(getPrevPost[0].data[getPrevPost[0].data.length - 1], getNextPostInCtg[0])
                    }
                }

                if (getNextPostInCtg.length === 0) {
                    if (getNextPost.length === 0) {
                        const getMainContent = data.filter((e, i) => i === 0)
                        newArr.push(getPrevPostInCtg[0], getMainContent[0].data[0])
                    }
                    else {
                        newArr.push(getPrevPostInCtg[0], getNextPost[0].data[0])
                    }
                }

                if (getPrevPostInCtg.length !== 0 && getNextPostInCtg.length !== 0) {
                    newArr.push(getPrevPostInCtg[0], getNextPostInCtg[0])
                }

                setNextAndPrevPosts(newArr)
            }
        }, 0)

        return { indexCategoryBlog, indexDetailBlog }
    }

    function RenderParagraphSatu({ paragraphSatu }) {
        return (
            <p className="paragraph-main-content" dangerouslySetInnerHTML={{ __html: paragraphSatu }}></p>
        )
    }

    function RenderParagraphBeforeHighlight({ text }) {
        return (
            <p className="paragraph-before-highlight" dangerouslySetInnerHTML={{ __html: text }}></p>
        )
    }

    function RenderParagraphHighlight({ paragraphHighlight }) {
        return (
            <p className="paragraph-highlight" dangerouslySetInnerHTML={{ __html: paragraphHighlight }}></p>
        )
    }

    function RenderParagraphDua({ paragraphDua }) {
        return (
            <p className="paragraph-body-content" dangerouslySetInnerHTML={{ __html: paragraphDua }}></p>
        )
    }

    function mouseOverPaginate(idx) {
        if (hoverBgImgPaginate.length > 0) {
            for (let i = 0; i < hoverBgImgPaginate.length; i++) {
                hoverBgImgPaginate[i].style.opacity = '0'
            }

            hoverBgImgPaginate[idx].style.opacity = '1'
        }
    }

    function mouseLeavePaginate() {
        for (let i = 0; i < hoverBgImgPaginate.length; i++) {
            hoverBgImgPaginate[i].style.opacity = '0'
        }
    }

    function toPage(path) {
        history.push(path)
        if (filterBlog.length > 0) {
            const getActiveListPostCtg = document.getElementsByClassName(filterBlog)
            if (getActiveListPostCtg.length > 0) {
                getActiveListPostCtg[0].style.color = "#777"
                getActiveListPostCtg[0].style.borderBottom = "2px dotted #eee"
            }
            selectBlogCategory('')
        }
    }

    function changeInput(e) {
        setInputComment({
            ...inputComment,
            [e.target.name]: e.target.value
        })

        if (Object.keys(errorMessage).length > 0) {
            setErrorMessage({
                ...errorMessage,
                [e.target.name]: ''
            })
        }
    }

    function postComment(data) {
        API.APIPostComment(_idDocument, idBlog, data)
            .then(res => {
                setAllAPI(undefined, undefined, true)
                return res
            })
            .catch(err =>{
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi')
                console.log(err)
                setLoadingPost(false)
            })
    }

    const nameMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const numMonth = new Date().getMonth()
    const date = new Date().getDate()
    const years = new Date().getFullYear()
    const hours = new Date().getHours()
    const minute = new Date().getMinutes()

    const getMonth = nameMonth[numMonth]
    const getHours = hours.toString().length === 1 ? `0${hours}` : hours
    const getMinutes = minute.toString().length === 1 ? `0${minute}` : minute

    function submitFormComment() {
        let err = {}

        const dataComment = {
            id: users && users.id,
            name: users && users.name,
            email: users && users.email,
            subject: inputComment.subject,
            message: inputComment.message,
            image: users && users.image,
            times: `${getMonth} ${date}, ${years} at ${getHours}:${getMinutes}`
        }

        if (!inputComment.subject) {
            err.subject = 'Must be required'
        }
        if (!inputComment.message) {
            err.message = 'Must be required'
        }

        if (Object.keys(err).length === 0) {
            if (Object.keys(users).length === 0) {
                history.push('/login')
                setRouteLoginFromComment(location)
            } else {
                setLoadingPost(true)
                postComment(dataComment)
            }
        }
        setErrorMessage(err)
    }

    function clickPopularPosts(path) {
        setLoadingBottom(true)
        history.push(`/blog/blog-details/${path}`)
        setAllAPI(path, true)
    }

    return (
        <>
            <div className="wrapp-detail-blog" id="wrapp">
                <div className="container-header">
                    {Object.keys(dataHeaders).length > 0 ? (
                        <Header
                            title={dataHeaders.title}
                            img={`${endpoint}/${dataHeaders.image}`}
                            page1="Blog"
                            page2="Blog Details"
                            displayIcon3="none"
                            clickPage2={() => toPage('/blog')}
                        />
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="container-content-blog-details">
                    <div className="column-kiri-content-blog-details">
                        {Object.keys(dataDetailBlog).length > 0 ? (
                            <>
                                <img src={`${endpoint}/${dataDetailBlog.image}`} alt="" className="img-content-blog-details" />

                                <div className="main-content-blog-details">
                                    <div className="column-category-blog-details">
                                        <p className="name-category-content date-group-blog-details">
                                            Category, {dataDetailBlog.category}
                                        </p>

                                        <p className="date-group-blog-details">
                                            {dataDetailBlog.clock}

                                            <i className="far fa-clock"></i>
                                        </p>

                                        <p className="date-group-blog-details">
                                            {dataDetailBlog.date}

                                            <i className="far fa-calendar-alt"></i>
                                        </p>

                                        <p className="date-group-blog-details">
                                            {dataDetailBlog.comments.length} Comments

                                            <i className="far fa-comment"></i>
                                        </p>
                                    </div>

                                    <div className="column-main-content">
                                        <p className="title-main-content">
                                            {dataDetailBlog.title}
                                        </p>
                                        <RenderParagraphSatu paragraphSatu={dataDetailBlog.paragraphSatu} />
                                    </div>
                                </div>

                                {dataDetailBlog && dataDetailBlog.paragraphBeforeHighlight ? (
                                    <RenderParagraphBeforeHighlight text={dataDetailBlog.paragraphBeforeHighlight} />
                                ) : (
                                    <div></div>
                                )}

                                {dataDetailBlog.paragraphHighlight !== 'null' ? (
                                    <RenderParagraphHighlight paragraphHighlight={dataDetailBlog.paragraphHighlight} />
                                ) : (
                                    <div></div>
                                )}

                                <img src={`${endpoint}/${dataDetailBlog.imageDetailContent && dataDetailBlog.imageDetailContent.image}`} alt="" className="img-content-blog-details img-body-content" />

                                {dataDetailBlog.paragraphDua !== 'null' ? (
                                    <RenderParagraphDua paragraphDua={dataDetailBlog.paragraphDua} />
                                ) : (
                                    <div></div>
                                )}

                                <div className="container-comments-blog-details">
                                    <div className="paginate-next-posts">
                                        {nextAndPrevPosts && nextAndPrevPosts.length > 0 ? nextAndPrevPosts.map((e, i) => {
                                            return (
                                                <div className="card-prev-next-blog-details">
                                                    <Card
                                                        displayContentCard="flex"
                                                        img={`${endpoint}/${e.image}`}
                                                        heightImg="60px"
                                                        title={i === 0 ? 'Prev Post' : 'Next Post'}
                                                        displayTxtComment="flex"
                                                        comments={`Category, ${e.category}`}
                                                        iconHoverImg={i === 0 ? 'fas fa-long-arrow-alt-left' : 'fas fa-long-arrow-alt-right'}
                                                        paragraph={e.title.length > 30 ? `${e.title.substr(0, 30)}...` : e.title}
                                                        flexDirectionWrapp={i === 0 ? 'row' : 'row-reverse'}
                                                        justifyContentTitle={i === 0 ? 'flex-start' : 'flex-end'}
                                                        textAlignTitle={i === 0 ? 'start' : 'end'}
                                                        justifyContentParagraph={i === 0 ? 'flex-start' : 'flex-end'}
                                                        textAlignParagraph={i === 0 ? 'start' : 'end'}
                                                        justifyContentTxtComment={i === 0 ? 'flex-start' : 'flex-end'}
                                                        textAlignTxtComment={i === 0 ? 'start' : 'end'}
                                                        widthImg="auto"
                                                        fontSizeTitle="12px"
                                                        fontSizeParagraph="14px"
                                                        fontSizeTxtComment="12px"
                                                        colorTxtComment="#3face4"
                                                        marginTopTxtComment="5px"
                                                        marginTitle="0 0 5px 0"
                                                        bgColorWrapp="transparent"
                                                        marginImg={i === 0 ? '0 15px 0 0' : '0 0 0 15px'}
                                                        alignItemsWrapp="center"
                                                        colorTitle="#777"
                                                        fontWeightTitle="normal"
                                                        colorParagraph="#000"
                                                        fontWeightParagraph="bold"
                                                        cursorParagraph="pointer"
                                                        classHoverBgImg="hover-paginate-blog-details"
                                                        mouseOver={() => mouseOverPaginate(i)}
                                                        mouseLeave={mouseLeavePaginate}
                                                        clickImg={() => clickPopularPosts(e.path)}
                                                        clickParagraph={() => clickPopularPosts(e.path)}
                                                    />
                                                </div>
                                            )
                                        }) : (
                                            <div></div>
                                        )}
                                    </div>

                                    <div className="column-list-comments-blog-details">
                                        <p className="total-comments" id="total-comments">
                                            {listUserComments.length} Comments
                                        </p>

                                        {listUserComments && listUserComments.length > 0 ? listUserComments.map((e, i) => {
                                            return (
                                                <Card
                                                    key={i}
                                                    displayContentCard="flex"
                                                    img={`${endpoint}/${e.image}`}
                                                    heightImg="35px"
                                                    title={e.name}
                                                    paragraph={e.times}
                                                    comments={e.message}
                                                    displayTxtComment="flex"
                                                    flexDirectionWrapp="row"
                                                    widthImg="35px"
                                                    fontSizeTitle="14px"
                                                    fontSizeParagraph="12px"
                                                    marginTitle="0 0 5px 0"
                                                    marginImg="0 15px 0 0"
                                                    bgColorWrapp="transparent"
                                                    marginWrapp="40px 0 0 0"
                                                    colorTitle="#000"
                                                    colorParagraph="#ccc"
                                                    cursorImg="default"
                                                    bdrRadiusImg="500px"
                                                />
                                            )
                                        }) : (
                                            <div></div>
                                        )}
                                    </div>

                                    <div className="leave-a-reply">
                                        <p className="title-leave-a-reply">
                                            Leave a Reply
                                        </p>

                                        <form onSubmit={(e) => e.preventDefault()} className="form-leave-a-reply">
                                            <Input
                                                type="text"
                                                placeholder="Subject"
                                                widthInputCard="100%"
                                                nameInput="subject"
                                                displayErrorMsg="flex"
                                                valueInput={inputComment.subject}
                                                errorMessage={errorMessage && errorMessage.subject}
                                                changeInput={changeInput}
                                            />
                                            <Input
                                                displayTxtInput="none"
                                                displayTxtArea="flex"
                                                widthInputCard="100%"
                                                placeholderTxtArea="Message"
                                                resizeTxtArea="none"
                                                widthTxtArea="100%"
                                                nameTextArea="message"
                                                displayErrorMsg="flex"
                                                marginTxtArea="15px 0 0 0"
                                                errorMessage={errorMessage && errorMessage.message}
                                                changeTextArea={changeInput}
                                            />

                                            <div className="column-btn-submit-leave-a-reply">
                                                <Button
                                                    nameBtn="Post Comment"
                                                    padding="12px 40px"
                                                    click={submitFormComment}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <PopularPosts
                        dataPopularPosts={dataPopularPosts}
                        dataPostCategories={dataPostCategories}
                        btnListPostCategories={async (id) => {
                            toPage('/blog')
                            await selectBlogCategory(id, true)
                        }}
                        clickPopularPosts={(path) => clickPopularPosts(path)}
                        mouseOver={() => { }}
                    />
                </div>

                <Loading
                    displayLoadingPage={loading ? 'flex' : 'none'}
                    displayLoadingBottom="flex"
                    rightLoadingBottom={loadingBottom ? '40px' : '-1000px'}
                />
                <Loading
                    displayLoadingBottom="flex"
                    rightLoadingBottom={loadingPost ? '40px' : '-1000px'}
                    displayBarrier={loadingPost ? 'flex' : 'none'}
                />
            </div>
        </>
    )
}

export default DetailBlog;