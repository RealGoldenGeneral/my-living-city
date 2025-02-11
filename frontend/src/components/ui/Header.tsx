import { useContext, useEffect, useState } from "react";
import CSS from "csstype";
import {
  NavDropdown,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { useUserWithJwtVerbose } from "src/hooks/userHooks";
import { UserProfileContext } from "../../contexts/UserProfile.Context";
import { searchForLocation } from 'src/lib/api/googleMapQuery';
//import { useGoogleMapSearchLocation } from "src/hooks/googleMapHooks";
import { useSingleSegmentByName } from "src/hooks/segmentHooks";
import { findSegmentByName } from "src/lib/api/segmentRoutes";
import {
  useAllUserSegments,
  useAllUserSegmentsRefined,
} from "src/hooks/userSegmentHooks";
import { getUserSubscriptionStatus } from 'src/lib/api/userRoutes'
import LoadingSpinner from "./LoadingSpinner";
import { BanMessageModal } from "../modal/BanMessageModal";
import { FindBanDetailsWithToken } from "src/hooks/banHooks";
import { WarningMessageModal } from "../modal/WarningMessageModal";

export default function Header() {
  const [stripeStatus, setStripeStatus] = useState("");
  const { logout, user, token } = useContext(UserProfileContext);
  const { data } = useUserWithJwtVerbose({
    jwtAuthToken: token!,
    shouldTrigger: token != null,
  });
  // const { data: googleQuery, isLoading: googleQueryLoading } = useGoogleMapSearchLocation({ lat: data?.geo?.lat, lon: data?.geo?.lon }, (data != null && data.geo != null));
  const { data: segData, isLoading: segQueryLoading } = useAllUserSegmentsRefined(token, user?.id || null);
  const { data: banData, isLoading: banQueryLoading} = FindBanDetailsWithToken(token)
 

  // const segData = useSingleSegmentByName({
  //   segName:googleQuery.data.city, province:googleQuery.data.province, country:googleQuery.data.country
  // }, googleQuery.data != null)

  const [userSegId, setUserSegId] = useState<any>(1);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(!localStorage.getItem('warningModalState'));

  // Hook to set localStorage: warningModalState to !null
  useEffect(() => {
    localStorage.setItem('warningModalState', String(showWarningModal));
  }, [showWarningModal]);

  // useEffect(() => {
  //   const querySegmentData = async () => {
  //     if (googleQueryLoading === false && googleQuery != null) {
  //       const segmentData = await findSegmentByName({
  //         segName: googleQuery.city, province: googleQuery.province, country: googleQuery.country,
  //       })

  //       //setUserSegId(segmentData.segId);
  //     }
  //   }
  //   querySegmentData();
  // }, [googleQuery, googleQueryLoading])

  useEffect(() => {
    if (segQueryLoading === false && segData != null && segData !== undefined) {
  
      setUserSegId(segData[0].id);
    }
  }, [segData, segQueryLoading])

  const paymentNotificationStyling: CSS.Properties = {
    backgroundColor: "#f7e4ab",
    justifyContent: "center",
    padding: "0.2rem",
    whiteSpace: "pre",
  }

  useEffect(() => {
    if (user) {
      getUserSubscriptionStatus(user.id).then(e => setStripeStatus(e.status)).catch(e => console.log(e))
    }
  }, [user])

  // TODO Redo how information is gathered for Community Dashboard, and remove reliance on params in url.
    if (segQueryLoading) {
      return (
        <div className="outer-header">
      {stripeStatus !== "" && stripeStatus !== "active" &&
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
        </Navbar>
        </div>
      );
  }

  return (
    <div className="outer-header">
      {stripeStatus !== "" && stripeStatus !== "active" &&
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
              {(user) ? (
                <>
                  {((banData && banData.banType === "WARNING") || !user.banned) && (
                    <NavDropdown title="Submit" id="nav-dropdown">
                      <Nav.Link href="/submit">Submit Idea</Nav.Link>

                      {((user.userType === "BUSINESS" || user.userType === "MUNICIPAL" || user.userType === "COMMUNITY")) && (

                        <Nav.Link href="/submit-direct-proposal">Submit Proposal</Nav.Link>
                      )}
                    </NavDropdown>
                  )}



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
                    <NavDropdown title="Mod Tools" id="nav-dropdown">
                      <Nav.Link href="/mod/management">Mod Management</Nav.Link>
                      {/*Nav.Link href="/moderator/queue" */}
                      {/*Nav.Link href="/moderator/management" */}
                      {/*Nav.Link href="/moderator/management" */}
                    </NavDropdown>
                  )}
                  {(user.userType === "RESIDENTIAL" || user.userType === "COMMUNITY" || user.userType === "BUSINESS") && (
                    <NavDropdown
                      title="Dashboard"
                      id="dashboard-dropdown">
                      <Nav.Link href="/dashboard">My Dashboard</Nav.Link>
                      <Nav.Link href={`/community-dashboard/${userSegId}`}>Community Dashboard</Nav.Link>
                    </NavDropdown>
                  )}

                  {/* <Nav.Link href="/dashboard">Dashboard</Nav.Link> */}
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
      { user && user.banned && banData && banData.banType === "SYS_BAN" ? <BanMessageModal/> : null }
      { user && user.banned && banData && banData.banType == "POST_BAN" ?
          <>
            <Navbar className="bg-warning text-dark justify-content-center" expand="sm">
              Account has been banned from posting
            </Navbar>
            <WarningMessageModal show={showWarningModal} setShow={setShowWarningModal}/>
          </>
          : null
      }
      { user && user.banned && banData && banData.banType == "WARNING" ?
        <>
          <Navbar className="bg-warning text-dark justify-content-center" expand="sm">
            Account has been issued a warning
          </Navbar>
          <WarningMessageModal show={showWarningModal} setShow={setShowWarningModal}/>
        </>
        : null
      }
    </div>
  );
}
