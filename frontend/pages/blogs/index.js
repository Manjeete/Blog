import Head from "next/head"
import React,{ useState } from "react"
import {listBlogsWithCategoriesAndTags} from "../../actions/blog";
import BlogCard from "../../components/blog/BlogCard";
import Link from "next/dist/client/link";
import {API,DOMAIN,APP_NAME} from '../../config'
import withRouter from "next/dist/client/with-router";

const Blogs = ({blogs,categories,tags,totalBlogs,blogsLimit,blogsSkip,router}) =>{

    const [limit,setLimit] = useState(blogsLimit)
    const [skip,setSkip] = useState(0)
    const [size,setSize] = useState(totalBlogs)
    const [loadedBlogs,setLoadedBlogs] = useState([])

    const loadMore = () =>{
        let toSkip = skip+limit
        listBlogsWithCategoriesAndTags(toSkip,limit).then(data =>{
            if(!data.status){
                console.log(data.msg)
            }else{
                setLoadedBlogs([...loadedBlogs,...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () =>{
        return (
            size > 0 && size>=limit && (<button onClick={loadMore} className="btn btn-outline-primary btn-lg">Load more</button>)
        )
    }

    const head = () =>(
        <Head>
            <title>Programming blogs | {APP_NAME}</title>
            <meta name="description" content="Programming blogs and tutorials" />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest web developments tutorials | ${APP_NAME}`} />
        </Head>
    )

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

    const showLoadedBlogs = () =>{
        return loadedBlogs.map((blog,i) =>(
            <article key={i}>
                <BlogCard blog={blog} />
            </article>
        ))
    }

    return (
        <React.Fragment>
            {head()}
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
                    {showAllBlogs()}
                </div>
                <div className="container-fluid">
                    {showLoadedBlogs()}
                </div>
                <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
            </main>
        </React.Fragment>
    )
}

Blogs.getInitialProps = () =>{
    let skip=0
    let limit=2
    return listBlogsWithCategoriesAndTags(skip,limit).then(data =>{
        if(!data.status){
            console.log(data.msg)
        }else{
            return {
                blogs:data.blogs,
                categories:data.categories,
                tags:data.tags,
                totalBlogs:data.results,
                blogsLimit:limit,
                blogsSkip:skip
            }
        }
    })
}

export default withRouter(Blogs);