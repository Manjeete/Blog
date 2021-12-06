import fetch from "isomorphic-fetch";

const API = 'http://localhost:8000/api/v1/blog'

//create category
export const blogCreate = (blog,token) =>{
    return fetch(`${API}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
            // "Content-Type": 'multipart/form-data',
        },
        body:blog
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}

export const listBlogsWithCategoriesAndTags = (skip,limit) =>{
    const data = {
        limit,skip
    }
    return fetch(`${API}/blogs-categories-tags`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}

//get single blog
export const singleBlog = slug =>{
    return fetch(`${API}/${slug}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}