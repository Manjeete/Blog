import Head from 'next/head'
import Link from 'next/dist/client/link'
import { userPublicProfile } from '../../actions/user'
import { API,DOMAIN,APP_NAME} from '../../config'
import React from 'react'
import moment from 'moment'
import withRouter from 'next/dist/client/with-router'
import ContactForm from '../../components/form/ContactForm'


const UserProfile = ({user,blogs,query,router}) =>{
    const head = () =>(

        <Head>
            <title>{user.name} | {APP_NAME}</title>
            <meta name="description" content={`Blogs by ${user.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${user.username}`} />
            <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
            <meta property="og:description" content={`Blogs by ${user.username}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/profile/${user.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image:type" content="image/jpg" />
        </Head>
    )

    const showUserBlogs = () =>{

        return blogs.map((blog,i) =>{
            return (
                <div className="mt-4 mb-4" key={i}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="lead">{blog.title}</a>
                    </Link>
                </div>
            )
        })
    }


    return (
        <React.Fragment>
            {head()}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h5>{user.name}</h5>
                                        <p className="text-muted">Joined {moment(user.createAt).fromNow()}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <img 
                                            src={`${API}/user/photo/${user.username}`} 
                                            className="img img-fluid img-thumbnail mb-3"
                                            style={{maxHeight:'auto',maxWidth:'100%'}}
                                            alt="user profile" 
                                        />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />

            <div className="container pb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">Recent blogs by {user.name}</h5>
                                <br />
                                {showUserBlogs()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">Message {user.name}</h5>
                                <br />
                                <ContactForm authorEmail={user.email} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

UserProfile.getInitialProps = ({query}) =>{
    return userPublicProfile(query.username).then(data =>{
        if(!data.status){
            console.log(data.msg)
        }else{
            return {user:data.user,blogs:data.blogs}
        }

    })
}

export default withRouter(UserProfile);