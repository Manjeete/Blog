import React, { useState,useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth,getCookie } from "../../actions/auth";
import { createCategory } from "../../actions/category";

const Category = () =>{
    const [values,setValues] = useState({
        name:'',
        error:false,
        success:false,
        categories:[],
        removed:false
    })

    const {name,error,success,categories,remove} = values
    const token = getCookie('token')

    const clickSubmit = e =>{
        e.preventDefault()
        // console.log("category",name)
        createCategory({name},token).then(data =>{
            if(!data.status){
                setValues({...values,error:data.msg,success:false})
            }else{
                setValues({...values,error:false,success:true,name:''});
            }
        })
    }

    const handleChange = e =>{
        setValues({...values,name:e.target.value,error:false,success:false,removed:false});
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
            {newCategoryForm()}
        </React.Fragment>
}

export default Category;