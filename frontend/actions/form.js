import fetch from "isomorphic-fetch";
const API = 'https://blog077.herokuapp.com/api/v1'
import { handleResponse } from "./auth";

//create category
export const emailContactForm = (data) =>{

    let emailEndpoint;

    if(data.authorEmail){
        emailEndpoint=`${API}/contact-blog-author`
    }else{
        emailEndpoint=`${API}/contact`
    }

    return fetch(`${emailEndpoint}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':`application/json`
        },
        body:JSON.stringify(data)
    })
    .then(response =>{
        handleResponse(response)
        return response.json();
    })
    .catch(err =>console.log(err))
}