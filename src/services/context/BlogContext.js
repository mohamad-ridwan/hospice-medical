import { createContext, useState } from "react";

export const BlogContext = createContext()

function BlogProvider({children}){
    const [filterBlog, setFilterBlog] = useState('')

    function selectBlogCategory(id){
        setFilterBlog(id)
    }

    return(
        <BlogContext.Provider value={[filterBlog, selectBlogCategory]}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogProvider