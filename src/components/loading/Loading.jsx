import './Loading.scss'

function Loading({displayLoadingBottom, rightLoadingBottom}){
    return(
        <>
        <div className="wrapp-loading-page">

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
        </>
    )
}

export default Loading