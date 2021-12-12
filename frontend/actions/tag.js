import fetch from "isomorphic-fetch";

const API = 'https://blog077.herokuapp.com/api/v1/tag'

//create category
export const createTag = (category,token) =>{
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


// get all categories
export const getAllTags = () =>{
    return fetch(`${API}`,{
        method:'GET',
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}


// get one category
export const getTag = (slug) =>{
    return fetch(`${API}/${slug}`,{
        method:'GET',
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}


//delete category
export const deleteTag = (slug,token) =>{
    return fetch(`${API}/${slug}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}

