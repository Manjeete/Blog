import Link from "next/link"
import React, { useEffect,useState } from "react"
import Router from 'next/router'
import { getCookie,isAuth,updateUser } from "../../actions/auth"
import { getProfile,update } from "../../actions/user"
import { API } from "../../config"


const ProfileUpdate = () => {
    const [values,setValues] = useState({
        username:'',
        name:'',
        email:'',
        password:'',
        about:'',
        error:false,
        success:false,
        loading:false,
        photo:'',
        userData:''
    })

    const token = getCookie('token')
    const {username,name,email,password,error,success,loading,photo,userData,about} = values

    const init = () =>{
        getProfile(token).then(data =>{
            if(!data.status){
                setValues({...values,error:data.msg})
            }else{
                updateUser(data.profile,() =>{
                    setValues({...values,
                        username:data.profile.username,
                        name:data.profile.name,
                        email:data.profile.email,
                        about:data.profile.about
                    })
                })
            }
        })
    }

    useEffect(() =>{
        init()
    },[])

    const handleChange = name => e =>{
        const value = name === 'photo' ? e.target.files[0]:e.target.value;
        let userFormData = new FormData()
        userFormData.set(name,value);
        setValues({...values,[name]:value,userData:userFormData,error:false,success:false});
    };

    const handleSubmit = e =>{
        e.preventDefault()
        setValues({...values,loading:true})
        update(token,userData).then(data =>{
            if(!data.status){
                setValues({...values,error:data.msg,success:false,loading:false})
            }else{
                setValues({...values,
                    username:data.profile.username,
                    name:data.profile.name,
                    email:data.profile.email,
                    about:data.profile.about,
                    success:data.msg,
                    loading:false
                })
            }
        })
    }


    const profileUpdateForm = () =>{
        return (<form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-info">
                    Profile Photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="text" value={email} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
        )
    }

    const showError = () =>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>{error}</div>
    )

    const showSuccess = () =>(
        <div className="alert alert-success" style={{display:success?'':'none'}}>{success}</div>
    )

    const showLoading = () =>(
        <div className="alert alert-info" style={{display:loading?'':'none'}}>Loading...</div>
    )

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img 
                            src={`${API}/user/photo/${username}`} 
                            className="img img-fluid img-thumbnail mb-3"
                            style={{maxHeight:'auto',maxWidth:'100%'}}
                            alt="user profile" 
                        />
                    </div>
                    <div className="col-md-8 mb-5">
                        {showError()}
                        {showSuccess()}
                        {showLoading()}
                        {profileUpdateForm()}
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfileUpdate
