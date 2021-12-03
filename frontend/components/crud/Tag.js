import React, { useState,useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth,getCookie } from "../../actions/auth";
import { createTag, getAllTags, deleteTag } from "../../actions/tag";

const Tag = () =>{
    const [values,setValues] = useState({
        name:'',
        error:false,
        success:false,
        tags:[],
        removed:false,
        reload:false
    })

    const {name,error,success,tags,removed,reload} = values
    const token = getCookie('token')

    //get all category from database when it's loading
    useEffect(() =>{
        loadTags()
    },[reload])

    //load categories
    const loadTags = () =>{
        getAllTags().then(data =>{
            if(!data.status){
                setValues({...values,error:data.msg,success:false,})
            }else{
                setValues({...values,error:false,success:true,tags:data.tag})
            }
        })
    }

    //show categories
    const showTags = () =>{
        return tags.map((c,i) =>{
            return(
                <button onDoubleClick={() =>deleteConfirm(c.slug)} title="Double click to delete" key={i} className="btn btn-outline-primary mr-1 ml mt-3">{c.name}</button>
            )
        })
    }

    //delete category
    const deleteConfirm = (slug) =>{
        let answer = window.confirm('Are you sure you want to delete this category?')
        if(answer){
            deleteOneTag(slug)
        }
    }

    const deleteOneTag = slug =>{
        // console.log('delete',slug)
        deleteTag(slug,token).then(data =>{
            if(!data.status){
                console.log(data.msg)
            }else{
                setValues({...values,error:false,success:false,name:'',removed:!removed,reload:!reload})
            }
        })
    }

    const clickSubmit = e =>{
        e.preventDefault()
        // console.log("category",name)
        createTag({name},token).then(data =>{
            if(!data.status){
                setValues({...values,error:data.msg,success:false})
            }else{
                setValues({...values,error:false,success:false,name:'',removed:!removed,reload:!reload});
            }
        })
    }

    const handleChange = e =>{
        setValues({...values,name:e.target.value,error:false,success:false,removed:false});
    }

    const showSuccess = () =>{
        if(success){
            return <p className="text-success">Category is created.</p>
        }
    }

    const showError = () =>{
        if(error){
            return <p className="text-danger">Category is already exist.</p>
        }
    }

    const showRemoved = () =>{
        if(removed){
            return <p className="text-danger">Category is removed.</p>
        }
    }

    const mouseMoveHandler = (e) =>{
        setValues({...values,error:false,success:false,removed:false})
    }

    const newCategoryForm = () =>(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted"></label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div>
                 <button type="submit" className="btn btn-primary">Create</button>

            </div>
        </form>
    )

    return <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}>
                {newCategoryForm()}
                {showTags()}
            </div>
        </React.Fragment>
}

export default Tag;