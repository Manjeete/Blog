import React, { useState } from 'react'
import {APP_NAME} from "../config";
import Link from 'next/link';
import Router from 'next/router';
import { signout,isAuth } from '../actions/auth';

import {
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavLink
} from 'reactstrap'

const Header = () => {
    const [isOpen,setIsOpen] = useState(false)
    return (
        <div>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <Link href="/" passHref>
                    <NavbarBrand>
                    {APP_NAME}
                    </NavbarBrand>
                </Link>
                <NavbarToggler onClick={() =>setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                <Nav
                    className="ml-auto"
                    navbar
                >
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

                    {isAuth() && (
                    <NavItem>
                        <NavLink style={{cursor:'pointer'}} onClick={() =>signout(() => Router.replace(`/signin`))}>
                            Signout
                        </NavLink>
                    </NavItem>
                    )}
    
                </Nav>
                </Collapse>
            </Navbar>
</div>
    )
}

export default Header
