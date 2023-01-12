import endpoint from "./endpoint"

async function useFetch(path, method, data){
    return await new Promise((resolve, reject)=>{
        fetch(`${endpoint}/${path}`, {
            method,
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}

export default useFetch