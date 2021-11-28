import React, { useState,useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth,getCookie } from "../../actions/auth";
import { createCategory, getAllCategories, deleteCategory } from "../../actions/category";

const Category = () =>{
    const [values,setValues] = useState({
        name:'',
        error:false,
        success:false,
        categories:[],
        removed:false,
        reload:false
    })

    const {name,error,success,categories,removed,reload} = values
    const token = getCookie('token')

    //get all category from database when it's loading
    useEffect(() =>{
        loadCategories()
    },[reload])

    //load categories
    const loadCategories = () =>{
        getAllCategories().then(data =>{
            if(!data.status){
                setValues({...values,error:data.msg,success:false,})
            }else{
                setValues({...values,error:false,success:true,categories:data.category})
            }
        })
    }

    //show categories
    const showCategories = () =>{
        return categories.map((c,i) =>{
            return(
                <button onDoubleClick={() =>deleteConfirm(c.slug)} title="Double click to delete" key={i} className="btn btn-outline-primary mr-1 ml mt-3">{c.name}</button>
            )
        })
    }

    //delete category
    const deleteConfirm = (slug) =>{
        let answer = window.confirm('Are you sure you want to delete this category?')
        if(answer){
            deleteOneCategory(slug)
        }
    }

    const deleteOneCategory = slug =>{
        // console.log('delete',slug)
        deleteCategory(slug,token).then(data =>{
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
        createCategory({name},token).then(data =>{
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
                {showCategories()}
            </div>
        </React.Fragment>
}

export default Category;