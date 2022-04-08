import { useContext, useState } from "react";
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
import { UserProfileContext } from "src/contexts/UserProfile.Context";
import DashboardPageContent from "../components/content/DashboardPageContent";
import { useIdeasHomepage, useUserIdeas } from "../hooks/ideaHooks";
import LoadingSpinner from "src/components/ui/LoadingSpinner";

export default function Dashboard() {
  const { logout, user, token } = useContext(UserProfileContext);
  const { data } = useUserWithJwtVerbose({
    jwtAuthToken: token!,
    shouldTrigger: token != null,
  });
  const {
    data: iData,
    error: iError,
    isLoading: iLoading,
    isError: iIsError,
  } = useIdeasHomepage();

  //TODO: Find way to wait for user id to be loaded before useUserIdeas
  const {
    data: uData,
    error: uError,
    isLoading: uLoading,
  } = useUserIdeas("ckz0lag2k0003tcv3uvunhmyl");

  console.log(uData);

  return (
    <div className="wrapper">
      <DashboardPageContent
        topIdeas={iData}
        ideasLoading={iLoading}
        ideasIsError={iIsError}
        ideasError={iError}
        userIdeas={uData}
      />
    </div>
  );
}
