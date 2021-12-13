import React from "react"
import { useState,useEffect } from "react"
// import { signup } from "../../actions/auth";
import {signup,isAuth} from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {

    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm:true
    });

    const {name,email,password,error,loading,message,showForm} = values;

    //redirect user to home page if user is already logged in
    useEffect(() =>{
        isAuth() && Router.push(`/`)
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        setValues({...values,loading:true,error:false,loading:false})
        const user = {name,email,password}

        signup(user)
        .then(data =>{
            console.log(data)
            if(!data.status){
                setValues({...values,error:data.msg || data.error})
            }else{
                setValues({...values,name:'',email:'',password:'',error:'',loading:false,message:data.msg,showForm:false})
            }
        })
    }

    const handleChange = name => (e) =>{
        setValues({...values,error:false,[name]:e.target.value})
    }

    //Alerts
    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div>:'');
    const showError = () =>(error ? <div className="alert alert-info">{error}</div>:"");
    const showMessage = () =>(message?<div className="alert alert-info">{message}</div>:'');


    const signupForm = () =>{
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={name} onChange={handleChange('name')} className="form-control" type="text" placeholder="Type Your Name" />
                </div>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} className="form-control" type="email" placeholder="Type your email" />
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} className="form-control" type="text" placeholder="Type Your password" />
                </div>
                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </React.Fragment>
    )
}

export default SignupComponent
