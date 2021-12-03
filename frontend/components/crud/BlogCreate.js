import Link from "next/link";
import React, {useState,useEffect} from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from "next/router";
import { getCookie,isAuth } from "../../actions/auth";
import {getAllCategories} from '../../actions/category';
import { getAllTags } from "../../actions/tag";

const ReactQuill = dynamic(() =>import('react-quill'),{ssr:false})
import "../../node_modules/react-quill/dist/quill.snow.css";

const createBlogForm = () =>{
    const [body,setBody] = useState({})
    const [values,setValues] = useState({
        error:'',
        sizeError:'',
        success:'',
        formData:'',
        title:'',
        handlePublishButton:false
    })

    const {error,sizeError,success,formData, title,handlePublishButton} = values;

    const publishBlog = (e) =>{
        e.preventDefault()
        console.log('ready to publishBlog')
    }
    
    const handleChange = name => e =>{
        console.log(e.target.value); 
    }
    
    const handleBody = e =>{
        console.log(e)
    }

    return (
        <form onSubmit={publishBlog}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" value={title} className="form-control" onChange={handleChange('title')} />
            </div>

            <div className="form-group">
                <ReactQuill value={body} placeholder="Write something..." onChange={handleBody} />
            </div>

            <div>
                <button type="submit" className="btn btn-primary">Publish</button>
            </div>
        </form>
    )
}

const BlogCreate = ({router}) => {
    return (
        <div>
            {createBlogForm()}
        </div>
    )
}

export default withRouter(BlogCreate);
