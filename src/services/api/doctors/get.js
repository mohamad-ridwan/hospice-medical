import endpoint from "../endpoint"

const GetDoctors = async (path)=>{
    return await new Promise((resolve, reject)=>{
        fetch(`${endpoint}/${path}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}

export default GetDoctors