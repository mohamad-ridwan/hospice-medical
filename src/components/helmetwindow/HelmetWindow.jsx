import { Helmet } from 'react-helmet'

function HelmetWindow({ title, description }) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
        </Helmet>
    )
}

export default HelmetWindow