import Private from "../../components/auth/Private"
import Link from "next/dist/client/link"

const userIndex = () => {
    return (
        <>
            <Private>
                <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 pt-5 pb-5"><h2>User Dashboard</h2></div>
                            <div className="col-md-4">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <Link href="/user/crud/blog">
                                            <a>Create Blog</a>
                                        </Link>
                                    </li>

                                    <li className="list-group-item">
                                        <Link href="/user/crud/blogs">
                                            <a>Update/Delete Blogs</a>
                                        </Link>
                                    </li>

                                    <li className="list-group-item">
                                        <a href="/user/update">Update profile</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-8">
                                right
                            </div>
                        </div>
                    </div>
            </Private>  
        </>
    )
}

export default userIndex
