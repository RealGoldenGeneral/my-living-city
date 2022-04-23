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
import MyPostsPageContent from "../components/content/MyPostsPageContent";
import { useIdeasHomepage, useUserIdeas } from "../hooks/ideaHooks";
import LoadingSpinner from "src/components/ui/LoadingSpinner";

export default function MyPostsPage() {
  const { logout, user, token } = useContext(UserProfileContext);
  const { data } = useUserWithJwtVerbose({
    jwtAuthToken: token!,
    shouldTrigger: token != null,
  });

  //doesnt get loaded before useUserIdeas is called
  const userId = data?.id;

  //CHANGES_NEEDED: Find way to wait for user id to be loaded before useUserIdeas
  const {
    data: uData,
    error: uError,
    isLoading: uLoading,
  } = useUserIdeas("ckz0lag2k0003tcv3uvunhmyl");

  console.log(uData);

  return (
    <div className="wrapper">
      <MyPostsPageContent userIdeas={uData} />
    </div>
  );
}
