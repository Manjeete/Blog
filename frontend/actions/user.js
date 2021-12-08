import fetch from "isomorphic-fetch";
import { API } from "../config";

//create category
export const userPublicProfile = (username) =>{
    console.log(API)

    return fetch(`${API}/user/${username}`,{
        method:'GET',
        headers:{
            Accept:'application/json'
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}