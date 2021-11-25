import Router from "next/router";
import React from "react"
import { useState } from "react"
// import { signup } from "../../actions/auth";
import {signin,authenticate} from "../../actions/auth";

const SigninComponent = () => {

    const [values,setValues] = useState({
        email:'admin@gmail.com',
        password:'123456',
        error:'',
        loading:false,
        message:'',
        showForm:true
    });

    const {email,password,error,loading,message,showForm} = values;

    const handleSubmit = (e) =>{
        e.preventDefault()
        setValues({...values,loading:true,error:false,loading:false})
        const user = {email,password}

        signin(user)
        .then(data =>{
            console.log(data)
            if(!data.status){
                setValues({...values,error:data.msg || data.error})
            }else{
                //save user token to cookie
                //save user info to localstorage
                //authenticate user
                authenticate(data,() =>{
                    Router.push(`/`)
                })
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


    const signinForm = () =>{
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} className="form-control" type="email" placeholder="Type your email" />
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} className="form-control" type="text" placeholder="Type Your password" />
                </div>
                <div>
                    <button className="btn btn-primary">Signin</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>
    )
}

export default SigninComponent;