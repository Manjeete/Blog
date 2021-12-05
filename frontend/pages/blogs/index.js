import Head from "next/head"
import React, { useState } from "react"
import {listBlogsWithCategoriesAndTags} from "../../actions/blog";
import BlogCard from "../../components/blog/BlogCard";
import Link from "next/dist/client/link";

const Blogs = ({blogs,categories,tags,size}) =>{

    const showAllBlogs = () =>{
        return blogs.map((blog,i) =>{
            return (<article key={i}>
                <BlogCard blog={blog} />
                <hr />
            </article>
            )
        })
    }

    const showAllCategories = () =>{
        return categories.map((c,i) =>(
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    }

    const showAllTags = () =>{
        return tags.map((t,i) =>(
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
    }

    return (
        <React.Fragment>
            <main>
                <div className="container-fluid">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold text-center">Programming blogs</h1>
                        </div>
                        <section>
                            <div className="pb-5 text-center">
                                {showAllCategories()}
                                <br />
                                {showAllTags()}
                            </div>
                        </section>
                    </header>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">{showAllBlogs()}</div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

Blogs.getInitialProps = () =>{
    return listBlogsWithCategoriesAndTags().then(data =>{
        if(!data.status){
            console.log(data.msg)
        }else{
            return {
                blogs:data.blogs,
                categories:data.categories,
                tags:data.tags,
                size:data.results
            }
        }
    })
}

export default Blogs;