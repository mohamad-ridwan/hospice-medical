const endpoint = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API : process.env.REACT_APP_PUBLIC_API

export default endpoint