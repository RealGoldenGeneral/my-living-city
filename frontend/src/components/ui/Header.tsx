import { useContext, useState } from "react";
import CSS from "csstype";
import {
  NavDropdown,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { useUserWithJwtVerbose } from "src/hooks/userHooks";
import { UserProfileContext } from "../../contexts/UserProfile.Context";
export default function Header() {
  const { logout, user, token } = useContext(UserProfileContext);
  const { data } = useUserWithJwtVerbose({
    jwtAuthToken: token!,
    shouldTrigger: token != null,
  });
  console.log(data);

  const paymentNotificationStyling: CSS.Properties = {
    backgroundColor: "#f7e4ab", 
    justifyContent: "center",
    padding: "0.2rem",
    whiteSpace: "pre",
  }

  // Here Items are not coming Inline
  return (
    <div className="outer-header">
      {user?.userType === "IN_PROGRESS" && 
        (<Nav style={paymentNotificationStyling}>
          You have not paid your account payment. To upgrade your account, please go to the <a href="/profile">profile</a> section.
        </Nav>)
      }
    
      <Navbar className="inner-header" bg="light" expand="sm">
        <Navbar.Brand href="/">
          <img
            src="/MyLivingCityIcon.png"
            width="30"
            height="30"
            className="d-inline-block alight-top"
            alt="My Living City Logo"
          />
        </Navbar.Brand>
        <Nav.Link href="/profile" className="d-inline-block alight-top">
          {data && `${data.fname}@${data!.address!.streetAddress}`}
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ideas">Conversations</Nav.Link>
            {user ? (
              <>
                {/* <Navbar.Text> Fake Name</Navbar.Text> */}

                <NavDropdown title="Submit" id="nav-dropdown">
                  <Nav.Link href="/submit">Submit Idea</Nav.Link>
                  {(user.userType === "BUSINESS"|| user.userType === "MUNICIPAL") && (
                    <Nav.Link href="/submit-direct-proposal">Submit Proposal</Nav.Link>
                  )}
                </NavDropdown>

                <Nav.Link href="/profile">Profile</Nav.Link>

                {user.userType === "ADMIN" && (
                  <NavDropdown title="Admin Tools" id="nav-dropdown">
                    <Nav.Link href="/advertisement/all">Ad Manager</Nav.Link>
                    <Nav.Link href="/segment/management">Segments</Nav.Link>
                    <Nav.Link href="/user/management">Users</Nav.Link>
                  </NavDropdown>
                )}
                {(user.userType === "BUSINESS" || user.userType === "COMMUNITY") && (
                  <Nav.Link href="/advertisement/user">My Ads</Nav.Link>
                )}
                {user.userType === "SEG_ADMIN" && (
                  <NavDropdown title="Seg-Admin Tools" id="nav-dropdown">
                    <Nav.Link href="/segment/management">Segments</Nav.Link>
                  </NavDropdown>
                )}
                {user.userType === "MOD" && (
                  <NavDropdown
                    title="Mod Tools"
                    id="nav-dropdown"
                  ></NavDropdown>
                )}
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="https://mylivingcity.org/community-discussion-platform-help-pages/">
                  Help
                </Nav.Link>
                <Nav.Link onClick={() => logout()}>Log out</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
