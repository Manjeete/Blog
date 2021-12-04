import Link from "next/link";
import React, {useState,useEffect} from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import router, { withRouter } from "next/router";
import { getCookie,isAuth } from "../../actions/auth";
import {getAllCategories} from '../../actions/category';
import { getAllTags } from "../../actions/tag";

const ReactQuill = dynamic(() =>import('react-quill'),{ssr:false})
import "../../node_modules/react-quill/dist/quill.snow.css";

const BlogCreate = ({router}) => {

    const blogFromLS = () =>{
        if(typeof window === 'undefined'){
            return false
        }

        if(localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'))
        }else{
            return false
        }
    }

    const [categories,setCategories] = useState([])
    const [tags,setTags] = useState([])

    const [checkedCat,setCheckedCat] = useState([])
    const [checkedTag,setCheckedTag] = useState([])

    const [body,setBody] = useState(blogFromLS())
    const [values,setValues] = useState({
        error:'',
        sizeError:'',
        success:'',
        formData:'',
        title:'',
        handlePublishButton:false
    })

    const {error,sizeError,success,formData, title,handlePublishButton} = values;

    useEffect(() =>{
        setValues({...values,formData:new FormData()})
        initCategories()
        initTags()
    },[router])

    const initCategories = () =>{
        getAllCategories().then(data =>{
            console.log(data)
            if(!data.status){
                setValues({...values,error:data.msg})
            }else{
                setCategories(data.category)
            }
        })
    }

    const initTags = () =>{
        getAllTags().then(data =>{
            if(!data.status){
                setValues({...values,error:data.msg})
            }else{
                setTags(data.tag)
            }
        })
    }

    const publishBlog = (e) =>{
        e.preventDefault()
        console.log('ready to publishBlog')
    }
    
    const handleChange = name => e =>{
        const value = name === 'photo' ? e.target.files[0]:e.target.value 
        formData.set(name,value);
        setValues({...values,[name]:value,formData,error:''});
    };
    
    const handleBody = e =>{
        setBody(e)
        formData.set('body',e)
        if(typeof window !== 'undefined'){
            localStorage.setItem('blog',JSON.stringify(e))
        }
    };

    const handleToggle = (c)  => ()=>{
        setValues({...values,error:''})
        //all cartegories
        const all = [...checkedCat]
        const clickedCategory = checkedCat.indexOf(c)

        if(clickedCategory === -1){
            all.push(c)
        }else{
            all.splice(clickedCategory,1)
        }
        console.log(all)
        setCheckedCat(all)
        formData.set('categories',all)
    }

    const handleTagsToggle = (t)  => ()=>{
        setValues({...values,error:''})
        //all cartegories
        const all = [...checkedTag]
        const clickedTag = checkedTag.indexOf(t)

        if(clickedTag === -1){
            all.push(t)
        }else{
            all.splice(clickedTag,1)
        }
        console.log(all)
        setCheckedTag(all)
        formData.set('tags',all)
    }

    const showCategories = () =>{
        return (
            categories && categories.map((c,i) =>(
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }
    
    const showTags = () =>{
        return (
            tags && tags.map((t,i) =>(
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }

    const createBlogForm = () =>{
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" value={title} className="form-control" onChange={handleChange('title')} />
                </div>
    
                <div className="form-group">
                    <ReactQuill modules={BlogCreate.modules} formats={BlogCreate.formats} value={body} placeholder="Write something..." onChange={handleBody} />
                </div>
    
                <div>
                    <button type="submit" className="btn btn-primary">Publish</button>
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}
                    <hr />
                    {JSON.stringify(tags)}
                </div>
                <div className="col-md-4">
                    <div>
                        <h5>Categories</h5>
                        <hr />
                        <ul style={{maxHeight:'200px',overflowY:'scroll'}}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{maxHeight:'200px',overflowY:'scroll'}}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

BlogCreate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};

BlogCreate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];

export default withRouter(BlogCreate);
