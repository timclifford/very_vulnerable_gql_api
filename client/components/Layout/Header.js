import { Fragment, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";
import UserContext from "../../context/UserContext";
import Signout from "../Auth/Signout";
import Error from "../Errors";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { me } = useContext(UserContext);

  const isAdmin = () => {
    const roles = me && me.roles;
    return roles && roles.includes("super-admin");
  }

  const isDoctor = () => {
    const roles = me && me.roles;
    return roles && roles.includes("doctor");
  }

  const isReceptionist = () => {
    const roles = me && me.roles;
    return roles && roles.includes("receptionist");
  }

  return (
    <Navbar color="dark" dark expand="md">
      <Link href="/">
        <NavLink
          style={{ cursor: "pointer", fontSize: "20px" }}
          className="font-weight-bold text-white"
        >
          General Healthcare Practice {me && me.practice && `| ${me.practice.name}`}
        </NavLink>
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {isDoctor() &&
            <NavItem>
              <Link href="/patients">
                <NavLink style={{ cursor: "pointer" }}>Patients</NavLink>
              </Link>
            </NavItem>
          }
          {isReceptionist() &&
            <NavItem>
              <Link href="/patients-directory">
                <NavLink style={{ cursor: "pointer" }}>Patients Directory</NavLink>
              </Link>
            </NavItem>
          }
          {isDoctor() || isReceptionist() &&
            <NavItem>
              <Link href="/appointments">
                <NavLink style={{ cursor: "pointer" }}>Appointments</NavLink>
              </Link>
            </NavItem>
          }
          {isAdmin() &&
            <NavItem>
              <Link href="/admin/users">
                <NavLink style={{ cursor: "pointer" }}>Users</NavLink>
              </Link>
            </NavItem>
          }
          <span className="spacer">|</span>
          {!me && (
            <Fragment>
              <NavItem>
                <Link href="/signup">
                  <NavLink style={{ cursor: "pointer" }}>Signup</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/signin">
                  <NavLink style={{ cursor: "pointer" }}>Signin</NavLink>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link href="/password">
                      <a
                        style={{
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "#212529",
                        }}
                      >
                        Reset password
                      </a>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Fragment>
          )}
          {me && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {me.display_name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link href="/profile">
                    <a
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "#212529",
                      }}
                    >
                      My profile
                    </a>
                  </Link>
                </DropdownItem>
                <Signout />
                <DropdownItem divider />
                <DropdownItem>
                  <Link href="/password">
                    <a
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "#212529",
                      }}
                    >
                      Reset password
                    </a>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
