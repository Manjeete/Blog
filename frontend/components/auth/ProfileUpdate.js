import Link from "next/link"
import React, { useEffect,useState } from "react"
import Router from 'next/router'
import { getCookie,isAuth } from "../../actions/auth"
import { getProfile,update } from "../../actions/user"


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
                setValues({...values,
                    username:data.profile.username,
                    name:data.profile.name,
                    email:data.profile.email,
                    about:data.profile.about
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
                    success:true,
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
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="text" value={password} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea onChange={handleChange('username')} type="text" value={about} className="form-control" />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
        )
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">image</div>
                    <div className="col-md-8 mb-5">
                        {profileUpdateForm()}
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfileUpdate
