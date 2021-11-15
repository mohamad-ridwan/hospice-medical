import BlogProvider from "./BlogContext"
import NavbarProvider from "./NavbarContext"

const IndexContext = ({ children }) => {
    return (
        <NavbarProvider>
            <BlogProvider>
                {children}
            </BlogProvider>
        </NavbarProvider>
    )
}

export default IndexContext