import endpoint from "./endpoint"

async function fetchJwtToken(path, method, token){
    return await new Promise((resolve, reject)=>{
        fetch(`${endpoint}/${path}`, {
            method,
            mode: 'cors',
            headers: {
                "Jwt-Token": token
            },
        })
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}

export default fetchJwtToken