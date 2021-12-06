import Link from "next/link";
import React, {useState,useEffect} from 'react';
import { getCookie,isAuth } from "../../actions/auth";
import {list,removeBlog} from "../../actions/blog";
import Router from "next/router";
import moment from "moment";

const ReadBlogs = () =>{

    const [blogs,setBlogs] = useState([])
    const [message,setMessage] = useState('')
    const token = getCookie('token')

    useEffect(() =>{
        loadBlogs()
    },[])

    const loadBlogs = () =>{
        list().then(data =>{
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
                console.log(err)
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

    const showAllBlogs = () =>{
        return blogs.map((blog,i) =>{
            return (
                <div key={i} className="pb-5">
                    <h3>{blog.title}</h3>
                    <p className="mark">Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}</p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>delete</button>
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
