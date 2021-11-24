import { useState } from 'react'
import {APP_NAME} from "../config";

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
                <NavbarBrand href="/">
                {APP_NAME}
                </NavbarBrand>
                <NavbarToggler onClick={() =>setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                <Nav
                    className="ml-auto"
                    navbar
                >
                    <NavItem>
                    <NavLink href="/components/">
                        Components
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">
                        GitHub
                    </NavLink>
                    </NavItem>
    
                </Nav>
                </Collapse>
            </Navbar>
</div>
    )
}

export default Header
