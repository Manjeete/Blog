import React from "react"
import SignupComponent from "../components/auth/SignupComponent"
import { useState } from "react"

const signup = () => {

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

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("form submit")
    }

    const handleChange = name => (e) =>{
        setValues({...values,error:false,[name]:e.target.value})
    }

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
            {signupForm()}
        </React.Fragment>
    )
}

export default signup
