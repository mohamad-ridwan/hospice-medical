import React, { useState, useEffect, useContext } from 'react';
import './DetailBlog.scss';
import Header from '../../components/header/Header';
import PopularPosts from '../../components/popularposts/PopularPosts';
import Card from '../../components/card/Card';
import imgPrevPost from '../../images/img-prev-post.jpg'
import imgNextPost from '../../images/img-next-post.jpg'
import imgComment1 from '../../images/img-comment1.jpg'
import imgComment2 from '../../images/img-comment2.jpg'
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import { useHistory } from 'react-router';
import { BlogContext } from '../../services/context/BlogContext';
import Loading from '../../components/loading/Loading';
import { NavbarContext } from '../../services/context/NavbarContext';

function DetailBlog() {
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers] = useContext(NavbarContext)
    const [filterBlog, selectBlogCategory, routeLoginFromComment, setRouteLoginFromComment] = useContext(BlogContext)
    const [loading, setLoading] = useState(false)
    const [dataHeaders, setDataHeaders] = useState({})
    const [dataDetailBlog, setDataDetailBlog] = useState({})
    const [dataPopularPosts, setDataPopularPosts] = useState([])
    const [dataPostCategories, setDataPostCategories] = useState([])
    const [_idDocument, set_IdDocument] = useState('')
    const [idBlog, setIdBlog] = useState('')
    const [listUserComments, setListUserComments] = useState([])
    const [errorMessage, setErrorMessage] = useState({})
    const [inputComment, setInputComment] = useState({
        name: '',
        subject: '',
        message: '',
    })
    const [nextAndPrevPosts, setNextAndPrevPosts] = useState([
        {
            img: imgPrevPost,
            title: 'Space The Final Frontier',
        },
        {
            img: imgNextPost,
            title: 'Telescopes 101',
        }
    ])
    const [dataComments, setDataComments] = useState([
        {
            image: imgComment1,
            name: 'Emilly Blunt',
            date: 'December 4, 2017 at 3:12 pm',
            comment: 'Never say goodbye till the end comes!'
        },
        {
            image: imgComment2,
            name: 'Maria Luna',
            date: 'December 4, 2017 at 3:12 pm',
            comment: 'Never say goodbye till the end comes!'
        }
    ])

    const location = window.location.pathname
    const history = useHistory()
    const hoverBgImgPaginate = document.getElementsByClassName('hover-paginate-blog-details')

    function setAllAPI(pathLocal) {
        setLoading(true)

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
                } else {
                    const getDataFromLocation = respons.filter((e) => e.id === idLocation)
                    const getDetailData = getDataFromLocation[0].data.filter((e) => e.path === pathLocation)
                    setDataDetailBlog(getDetailData[0])
                    set_IdDocument(getDataFromLocation[0]._id)
                    setIdBlog(getDetailData[0].id)
                    setListUserComments(getDetailData[0].comments)
                }

                const getPopularPosts = respons.filter((e) => e.id === 'popular-posts')
                const getFourItems = getPopularPosts[0].data.filter((e, i) => i < 4)
                setDataPopularPosts(getFourItems)

                const getPostCategory = respons.filter((e) => e.idCategory === "post-categories")
                setDataPostCategories(getPostCategory)

                setTimeout(() => {
                    setLoading(false)
                }, 10);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI()
        window.scrollTo(0, 0)
    }, [])

    function RenderParagraphSatu({ paragraphSatu }) {
        return (
            <p className="paragraph-main-content" dangerouslySetInnerHTML={{ __html: paragraphSatu }}></p>
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
                setAllAPI()

                setInputComment({
                    name: '',
                    subject: '',
                })

                return res
            })
            .catch(err => console.log(err))
    }

    const nameMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const numMonth = new Date().getMonth()
    const date = new Date().getDate()
    const years = new Date().getFullYear()
    const hours = new Date().getHours()
    const minute = new Date().getMinutes()

    const getMonth = nameMonth[numMonth + 1]
    const getHours = hours.toString().length === 1 ? `0${hours}` : hours
    const getMinutes = minute.toString().length === 1 ? `0${minute}` : minute

    function submitFormComment() {
        let err = {}

        const dataComment = {
            id: users && users.id,
            name: inputComment.name,
            email: users && users.email,
            subject: inputComment.subject,
            message: inputComment.message,
            image: users && users.image,
            times: `${getMonth} ${date}, ${years} at ${getHours}:${getMinutes}`
        }

        if (!inputComment.name) {
            err.name = 'Must be required!'
        }
        if (!inputComment.subject) {
            err.subject = '!Must be required'
        }
        if (!inputComment.message) {
            err.message = 'Must be required'
        }

        if (Object.keys(err).length === 0) {
            if (Object.keys(users).length === 0) {
                history.push('/login')
                setRouteLoginFromComment(location)
            } else {
                postComment(dataComment)
            }
        }
        setErrorMessage(err)
    }

    function clickPopularPosts(path) {
        history.push(`/blog/blog-details/${path}`)
        setAllAPI(path)
    }

    return (
        <>
            <div className="wrapp-detail-blog">
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

                                <RenderParagraphHighlight paragraphHighlight={dataDetailBlog.paragraphHighlight} />

                                <img src={`${endpoint}/${dataDetailBlog.imageDetailContent && dataDetailBlog.imageDetailContent.image}`} alt="" className="img-content-blog-details img-body-content" />

                                <RenderParagraphDua paragraphDua={dataDetailBlog.paragraphDua} />

                                <div className="container-comments-blog-details">
                                    <div className="paginate-next-posts">
                                        {nextAndPrevPosts.map((e, i) => {
                                            return (
                                                <div className="card-prev-next-blog-details">
                                                    <Card
                                                        displayContentCard="flex"
                                                        img={e.img}
                                                        heightImg="60px"
                                                        title={i === 0 ? 'Prev Post' : 'Next Post'}
                                                        iconHoverImg={i === 0 ? 'fas fa-long-arrow-alt-left' : 'fas fa-long-arrow-alt-right'}
                                                        paragraph={e.title}
                                                        flexDirectionWrapp={i === 0 ? 'row' : 'row-reverse'}
                                                        justifyContentTitle={i === 0 ? 'flex-start' : 'flex-end'}
                                                        textAlignTitle={i === 0 ? 'start' : 'end'}
                                                        justifyContentParagraph={i === 0 ? 'flex-start' : 'flex-end'}
                                                        textAlignParagraph={i === 0 ? 'start' : 'end'}
                                                        widthImg="auto"
                                                        fontSizeTitle="14px"
                                                        fontSizeParagraph="18px"
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
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="column-list-comments-blog-details">
                                        <p className="total-comments">
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
                                                placeholder="Enter Name"
                                                widthInputCard="100%"
                                                nameInput="name"
                                                displayErrorMsg="flex"
                                                valueInput={inputComment.name}
                                                errorMessage={errorMessage && errorMessage.name}
                                                changeInput={changeInput}
                                            />
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
                            await selectBlogCategory(id)
                        }}
                        clickPopularPosts={(path) => clickPopularPosts(path)}
                        mouseOver={() => { }}
                    />
                </div>

                <Loading displayLoadingPage={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default DetailBlog;