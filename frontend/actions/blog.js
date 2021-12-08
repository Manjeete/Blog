import fetch from "isomorphic-fetch";
const API = 'http://localhost:8000/api/v1/blog'
import queryString from 'query-string';

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


//related blogs
export const listRelated = (blog) =>{
    return fetch(`${API}/related`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            "Content-Type": 'application/json'
        },
        body:JSON.stringify(blog)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}

//list blogs for admin
export const list = () =>{
    return fetch(`${API}/`,{
        method:'GET'
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}


//delete blog
export const removeBlog = (slug,token) =>{
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


//update blog
export const updateBlog = (blog,token,slug) =>{
    return fetch(`${API}/${slug}`,{
        method:'PATCH',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:blog
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}


//search 
export const listSearch = (params) =>{
    console.log(params)
    let query = queryString.stringify(params)
    console.log(query)
    return fetch(`${API}/search?${query}`,{
        method:'GET'
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}