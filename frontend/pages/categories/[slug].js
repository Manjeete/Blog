import Head from "next/head"
import {getOneCategory} from "../../actions/category";
import Link from "next/dist/client/link";
import {API,DOMAIN,APP_NAME} from '../../config'
import withRouter from "next/dist/client/with-router";
import React from "react";
import BlogCard from "../../components/blog/BlogCard";

const Category = ({category,blogs}) =>{

    const head = () =>(
        <Head>
            <title>{category.title} | {APP_NAME}</title>
            <meta name="description" content={`Best programming blog on ${category.name}`} />
        </Head>
    )

    return (
        <React.Fragment>
            <main>
                <div className="container-fluid text-center">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold">{category.name}</h1>
                                {blogs.map((b,i) => (
                                    <div key={i}>
                                        <BlogCard blog={b} />
                                        <hr />
                                    </div>
                                ))}
                        </div>
                    </header>
                </div>
            </main>
        </React.Fragment>
    )
}


Category.getInitialProps = ({query}) =>{
    return getOneCategory(query.slug).then(data =>{
        if(!data.status){
            console.log(data.msg)
        }else{
            return {category:data.category,blogs:data.blogs}
        }
    })
}

export default Category;