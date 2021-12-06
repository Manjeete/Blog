import Link from "next/link"
import moment from "moment"
import renderHTML from "react-render-html"

const photoAPI = "http://127.0.0.1:8000/api/v1/blog"

const SmallCard = ({blog}) => {

    return (
        <div className="card">
            <section>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <img className="img img-fluid" style={{maxHeight:'auto',width:'100%'}} src={`${photoAPI}/photo/${blog.slug}`} alt={blog.title} />

                    </a>
                </Link>
            </section>
            <div className="card-body">
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a><h5 className="card-title">{blog.title}</h5></a>
                    </Link>
                    <p className="cart-text">{renderHTML(blog.excerpt)}</p>
                </section>
            </div>
            <div className="card-body">
                Posted {moment(blog.updatedAt).fromNow()} by <Link href={`/`}><a className="float-right">{blog.postedBy.name}</a></Link>
            </div>
        </div>
    )
}

export default SmallCard
