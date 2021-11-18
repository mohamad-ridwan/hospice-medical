import { createContext, useState } from "react";

export const BlogContext = createContext()

function BlogProvider({children}){
    const [filterBlog, setFilterBlog] = useState('')
    const [routeLoginFromComment, setRouteLoginFromComment] = useState(null)

    function selectBlogCategory(id){
        setFilterBlog(id)
    }

    return(
        <BlogContext.Provider value={[filterBlog, selectBlogCategory, routeLoginFromComment, setRouteLoginFromComment]}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogProvider