import fetch from "isomorphic-fetch";
const API = 'https://blog077.herokuapp.com/api/v1/blog'
import queryString from 'query-string';
import { isAuth,handleResponse } from "./auth";

//create category
export const blogCreate = (blog,token) =>{

    let createBlogEnd;

    if(isAuth() && isAuth().role===1){
        createBlogEnd=`${API}`
    }else if(isAuth() && isAuth().role===0){
        createBlogEnd=`${API}/user`
    }

    return fetch(`${createBlogEnd}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
            // "Content-Type": 'multipart/form-data',
        },
        body:blog
    })
    .then(response =>{
        handleResponse(response)
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
export const list = ({username}) =>{

    let createBlogEnd;
    if(username){
        createBlogEnd=`${API}/${username}/blogs`
    }else{
        createBlogEnd=`${API}`
    }

    return fetch(`${createBlogEnd}`,{
        method:'GET'
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}


//delete blog
export const removeBlog = (slug,token) =>{

    let deleteBlogEnd;

    if(isAuth() && isAuth().role===1){
        deleteBlogEnd=`${API}/${slug}`
    }else if(isAuth() && isAuth().role===0){
        deleteBlogEnd=`${API}/user/${slug}`
    }

    return fetch(`${deleteBlogEnd}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        handleResponse(response)
        return response.json();
    })
    .catch(err =>console.log(err))
}


//update blog
export const updateBlog = (blog,token,slug) =>{

    let updateBlogEnd;

    if(isAuth() && isAuth().role===1){
        updateBlogEnd=`${API}/${slug}`
    }else if(isAuth() && isAuth().role===0){
        updateBlogEnd=`${API}/user/${slug}`
    }

    return fetch(`${updateBlogEnd}`,{
        method:'PATCH',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:blog
    })
    .then(response =>{
        handleResponse(response)
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