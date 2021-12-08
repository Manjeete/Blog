import Head from "next/head"
import {getTag} from "../../actions/tag";
import Link from "next/dist/client/link";
import {API,DOMAIN,APP_NAME} from '../../config'
import withRouter from "next/dist/client/with-router";
import React from "react";
import BlogCard from "../../components/blog/BlogCard";

const Tag = ({tag,blogs}) =>{

    const head = () =>(
        <Head>
            <title>{tag.title} | {APP_NAME}</title>
            <meta name="description" content={`Best programming blog on ${tag.name}`} />
        </Head>
    )

    return (
        <React.Fragment>
            <main>
                <div className="container-fluid text-center">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold">{tag.name}</h1>
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


Tag.getInitialProps = ({query}) =>{
    return getTag(query.slug).then(data =>{
        if(!data.status){
            console.log(data.msg)
        }else{
            return {tag:data.tag,blogs:data.blogs}
        }
    })
}

export default Tag;