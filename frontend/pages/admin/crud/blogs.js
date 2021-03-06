import Admin from "../../../components/auth/Admin"
import Link from "next/link"
import ReadBlogs from "../../../components/crud/ReadBlogs";
import Tag from "../../../components/crud/Tag";

const Blogs = () => {
    return (
        <>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5"><h2>Manage blogs</h2></div>
                        <div className="col-md-12">
                            <ReadBlogs />
                        </div>
                    </div>
                </div>
            </Admin>  
        </>
    )
}

export default Blogs;
