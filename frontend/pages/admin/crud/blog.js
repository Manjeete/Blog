import Admin from "../../../components/auth/Admin"
import Link from "next/link"
import BlogCreate from "../../../components/crud/BlogCreate"
import Tag from "../../../components/crud/Tag";

const Blog = () => {
    return (
        <>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5"><h2>Create a new blog</h2></div>
                        <div className="col-md-12">
                            <BlogCreate />
                        </div>
                    </div>
                </div>
            </Admin>  
        </>
    )
}

export default Blog;
