import fetch from "isomorphic-fetch";

const API = 'http://localhost:8000/api/v1/category'

export const create = (category,token) =>{
    return fetch(`${API}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}