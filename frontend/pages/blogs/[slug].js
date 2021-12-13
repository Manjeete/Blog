import Head from "next/head"
import React,{ useState,useEffect } from "react"
import {singleBlog,listRelated} from "../../actions/blog";
import Link from "next/dist/client/link";
import {API,DOMAIN,APP_NAME, DISQUS_SHORTNAME} from '../../config'
import withRouter from "next/dist/client/with-router";
import moment from "moment";
import renderHTML from "react-render-html";
import SmallCard from "../../components/blog/SmallCard"
import DisqusThread from "../../components/DisqusThread";

const SingleBlog = ({blog,router}) =>{

    const [related,setRelated] = useState([])

    const loadRelated = () => {
        listRelated({blog}).then(data =>{
            if(!data.status){
                console.log(data.msg)
            }else{
                setRelated(data.blogs)
            }
        })
    }

    useEffect(() =>{
        loadRelated();
    },[]);

    const head = () =>(
        <Head>
            <title>{blog.title} | {APP_NAME}</title>
        </Head>
    )

    const showBlogCategories = blog =>{
        return blog.categories.map((c,i) =>{
            return(
                <Link key={i} href={`/categories/${c.slug}`}>
                    <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
                </Link>
            )
        })
    }

    const showBlogTags = blog =>{
       return blog.tags.map((t,i) =>{
            return(
                <Link key={i} href={`/categories/${t.slug}`}>
                    <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
                </Link>
            )
        })
    }

    const showRelatedBlogs = () =>{
        return related.map((blog,i) =>(
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ))
    }

    const showComments = () =>{
        return (
            <div>
                <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
            </div>
        )
    }

    return <React.Fragment>
        {head()}
        <main>
            <article>
                <div className="container-fluid">
                    <section>
                        <div className="row" style={{marginTop:'-30px'}}>
                            <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid featured_image" />
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <h5 className="display-2 pb-3 text-center font-weight-bold">{blog.title}</h5>
                            <p className="lead mt-3 mark">
                                Written by <Link href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</Link> | Published {moment(blog.updatedAt).fromNow()}
                            </p>
                            <div className="pb-3">
                                {showBlogCategories(blog)}
                                {showBlogTags(blog)}
                                <br />
                                <br />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="container">
                    <section>
                        <div className="col-md-12 lead">
                            {renderHTML(blog.body)}
                        </div>
                        <div className="container pb-5">
                            <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                            <hr />
                            <div className="row">
                                {showRelatedBlogs()}
                            </div>
                        </div>

                        <div className="container pb-5">
                            
                            {showComments()}
                        </div>
                    </section>
                </div>
            </article>
        </main>
    </React.Fragment>
}

SingleBlog.getInitialProps = ({query}) =>{
    return singleBlog(query.slug).then(data =>{
        if(!data.status){
            console.log(data.msg)
        }else{
            return {blog:data.blog}
        }
    })
}

export default withRouter(SingleBlog);