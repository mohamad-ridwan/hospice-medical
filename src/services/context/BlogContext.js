import { createContext, useState } from "react";

export const BlogContext = createContext()

function BlogProvider({children}){
    const [filterBlog, setFilterBlog] = useState('')
    const [routeLoginFromComment, setRouteLoginFromComment] = useState(null)
    const [scrollTopBlog, setScrollTopBlog] = useState(null)

    function selectBlogCategory(id, condition){
        setFilterBlog(id)
        setScrollTopBlog(condition)
    }

    return(
        <BlogContext.Provider value={[filterBlog, selectBlogCategory, routeLoginFromComment, setRouteLoginFromComment, scrollTopBlog]}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogProvider