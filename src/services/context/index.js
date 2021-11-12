import NavbarProvider from "./NavbarContext"

const IndexContext = ({children})=>{
    return(
    <NavbarProvider>
        {children}
    </NavbarProvider>
    )
}

export default IndexContext