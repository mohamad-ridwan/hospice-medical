import './Loading.scss'

function Loading({ displayLoadingBottom, rightLoadingBottom, displayLoadingPage, displayBarrier }) {
    return (
        <>
            <div className="wrapp-loading-page" style={{
                display: displayLoadingPage
            }}>
                <div className="circle-loading-page">
                </div>
                <p className="txt-loading-page">
                    Loading
                </p>
            </div>
            <div className="loading-bottom" style={{
                display: displayLoadingBottom,
                right: rightLoadingBottom,
            }}>
                <div className="circle-loading-bottom">

                </div>
                <p className="txt-loading-bottom">
                    Loading...
                </p>
            </div>

            <div className="barrier-loading-bottom" style={{
                display: displayBarrier
            }}>

            </div>
        </>
    )
}

export default Loading