import Link from "next/link"
import moment from "moment"
import renderHTML from "react-render-html"

const photoAPI = "http://127.0.0.1:8000/api/v1/blog"

const BlogCard = ({blog}) => {

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

    return (
        <div className="lead pb-4">
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a><h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2></a>
                </Link>
            </header>
            <section>
                <p className="mark ml-1 pt-2 pb-2">
                    Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                </p>
            </section>
            <section>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
                <br />
                <br />

            </section>

            <div className="row">
                <div className="col-md-4">
                    <section>
                        <img className="img img-fluid" style={{maxHeight:'150px',width:'auto'}} src={`${photoAPI}/photo/${blog.slug}`} alt={blog.title} />
                    </section>
                </div>
                <div className="col-md-8">
                    <section>
                        <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="btn btn-primary pt-2">Read more</a>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default BlogCard