import fetch from "isomorphic-fetch";

const API = 'http://localhost:8000/api/v1/blog'

//create category
export const blogCreate = (blog,token) =>{
    console.log(blog)
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


// get all categories
// export const getAllCategories = () =>{
//     return fetch(`${API}`,{
//         method:'GET',
//     })
//     .then(response =>{
//         return response.json();
//     })
//     .catch(err =>console.log(err))
// }


// // get one category
// export const getOneCategory = (slug) =>{
//     return fetch(`${API}/${slug}`,{
//         method:'GET',
//     })
//     .then(response =>{
//         return response.json();
//     })
//     .catch(err =>console.log(err))
// }


// //delete category
// export const deleteCategory = (slug,token) =>{
//     return fetch(`${API}/${slug}`,{
//         method:'DELETE',
//         headers:{
//             Accept:'application/json',
//             'Content-Type':'application/json',
//             Authorization:`Bearer ${token}`
//         }
//     })
//     .then(response =>{
//         return response.json();
//     })
//     .catch(err =>console.log(err))
// }

