import React, { useState } from 'react'
import {APP_NAME} from "../config";
import Link from 'next/link';
import Router from 'next/router';
import { signout,isAuth } from '../actions/auth';
import NProgress from 'nprogress';
import Search from './blog/Search';

import {
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavLink
} from 'reactstrap'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = () => {
    const [isOpen,setIsOpen] = useState(false)
    return (
        <React.Fragment>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <Link href="/" passHref>
                    <NavbarBrand>
                    M-Blog
                    </NavbarBrand>
                </Link>
                <NavbarToggler onClick={() =>setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                <Nav
                    className="ml-auto"
                    navbar
                >
                    <React.Fragment>
                        <NavItem>
                            <Link href="/blogs">
                                <NavLink>
                                    Blogs
                                </NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/contact">
                                <NavLink>
                                    Contact
                                </NavLink>
                            </Link>
                        </NavItem>
                    </React.Fragment>

                    {!isAuth() && (
                    <React.Fragment>
                        <NavItem>
                            <Link href="/signup">
                                <NavLink>
                                    Signup
                                </NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/signin">
                                <NavLink>
                                    Signin
                                </NavLink>
                            </Link>
                        </NavItem>
                        </React.Fragment>
                    )}

                    {isAuth() && isAuth().role ===0 &&(
                    <NavItem>
                        <Link href='/user'>
                            <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                        </Link>
                        <NavLink style={{cursor:'pointer'}} onClick={() =>signout(() => Router.replace(`/signin`))}>
                            
                        </NavLink>
                    </NavItem>
                    )}

                    {isAuth() && isAuth().role ===1 &&(
                    <NavItem>
                        <Link href='/admin'>
                            <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                        </Link>
                        <NavLink style={{cursor:'pointer'}} onClick={() =>signout(() => Router.replace(`/signin`))}>
                            
                        </NavLink>
                    </NavItem>
                    )}

                    {isAuth() && (
                    <NavItem>
                        <NavLink style={{cursor:'pointer'}} onClick={() =>signout(() => Router.replace(`/signin`))}>
                            Signout
                        </NavLink>
                    </NavItem>
                    )}

                    <NavItem>
                        <Link href="/user/crud/blog">
                            <NavLink className="btn btn-primary text-light">
                                Create blog
                            </NavLink>
                        </Link>
                    </NavItem>
    
                </Nav>
                </Collapse>
            </Navbar>
            <Search />
        </React.Fragment>
    )
}

export default Header
