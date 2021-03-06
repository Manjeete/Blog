import fetch from "isomorphic-fetch";
import cookie, { get } from 'js-cookie'
import Router from "next/router";

const API = 'https://blog077.herokuapp.com/api/v1/auth'

export const handleResponse = response =>{
    if(response.status === 401){
        signout(() =>{
            Router.push({
                pathname:'/signin',
                query:{
                    msg:'Your session is expired. Please signin.'
                }
            })

        })
        
    }else{
        return;
    }
}

export const signup = (user) =>{
    return fetch(`${API}/signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>console.log(err))
}

//user signin action
export const signin = (user) =>{
    return fetch(`${API}/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>console.log(err))
}

//signout action
export const signout = (next) =>{
    removeCookie('token')
    removeLocalStorage('user')
    next()

    return fetch(`${API}/signout`,{
        method:'GET'
    })
    .then(response =>{
        console.log('signout success')
    })
    .catch(err =>console.log(err))
}

//set cookie
export const setCookie = (key,value) =>{
    // whether client side
    if(process.browser){
        cookie.set(key,value,{
            expires:1
        })
    }
}

//remove cookie
export const removeCookie = (key) =>{
    if(process.browser){
        cookie.remove(key,{
            expires:1
        })
    }
}

//get cookie
export const getCookie = (key) =>{
    if(process.browser){
        return cookie.get(key)
    }
}


//localstorage
export const setLocalStorage = (key,value) =>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) =>{
    if(process.browser){
        localStorage.removeItem(key)
    }
}


// authenticate user by pass data to cookie and localstorage
export const authenticate = (data,next) =>{
    setCookie('token',data.token);
    setLocalStorage('user',data.user);
    next(); 
}

// check user logged in or not  
export const isAuth = () =>{
    if(process.browser){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false
            }
        }
    }
}

//update local storage
export const updateUser = (user,next) =>{
    if(process.browser){
        if(localStorage.getItem('user')){
            let auth = JSON.parse(localStorage.getItem('user'));
            auth=user;
            localStorage.setItem('user',JSON.stringify(auth));
            next();
        }
    }
}

//user forgot action
export const forgotPassword = ({email}) =>{
    return fetch(`${API}/forgot-password`,{
        method:'PATCH',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email})
    })
    .then(response =>{
        console.log(response)
        return response.json()
    })
    .catch(err =>console.log(err))
}


export const resetPassword = resetInfo =>{
    return fetch(`${API}/reset-password`,{
        method:'PATCH',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(resetInfo)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>console.log(err))
}