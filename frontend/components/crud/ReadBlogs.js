import Link from "next/link";
import React, {useState,useEffect} from 'react';
import { getCookie,isAuth } from "../../actions/auth";
import {list,removeBlog} from "../../actions/blog";
import Router from "next/router";
import moment from "moment";

const ReadBlogs = ({username}) =>{

    const [blogs,setBlogs] = useState([])
    const [message,setMessage] = useState('')
    const token = getCookie('token')

    useEffect(() =>{
        loadBlogs()
    },[])

    const loadBlogs = () =>{
        list({username}).then(data =>{
            if(!data.status){
                console.log(data.msg)
            }else{
                setBlogs(data.blog)
            }
        })
    }

    const deleteBlog = (slug) =>{
        removeBlog(slug,token).then(data =>{
            if(!data.status){
                console.log(data.msg)
            }else{
                setMessage("Blog deleted")
                loadBlogs()
            }
        })
    }

    const deleteConfirm = slug =>{
        let answer = window.confirm('Are you sure want to delete your blog?')
        if(answer){
            deleteBlog(slug)
        }
    }

    const showUpdateButton = (blog) =>{
        if(isAuth() && isAuth().role ===0){
            return (
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">Update</a>
                </Link>
            )
        }else if(isAuth && isAuth().role===1){
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className="ml-5 btn btn-sm btn-warning">Update</a>
                </Link>
            )
        }
    }

    const showAllBlogs = () =>{
        return blogs.map((blog,i) =>{
            return (
                <div key={i} className="pb-5">
                    <h3>{blog.title}</h3>
                    <p className="mark">Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}</p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>delete</button>
                    {showUpdateButton(blog)}
                </div>
            )
        })
    }

    return <React.Fragment>
        <div className="row">
            <div className="col-md-12">{showAllBlogs()}</div>
        </div>
    </React.Fragment>
}

export default ReadBlogs;
