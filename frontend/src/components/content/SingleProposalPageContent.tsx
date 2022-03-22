import { Button, Card, Col, Row, Image, Form } from "react-bootstrap";
import { IIdeaWithRelationship } from "../../lib/types/data/idea.type";
import {
  capitalizeFirstLetterEachWord,
  capitalizeString,
} from "../../lib/utilityFunctions";
import CommentsSection from "../partials/SingleIdeaContent/CommentsSection";
import RatingsSection from "../partials/SingleIdeaContent/RatingsSection";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  LineShareButton,
  LineIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import ChampionSubmit from "../partials/SingleIdeaContent/ChampionSubmit";
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "src/lib/constants";
import Popup from "../content/Popup";
import { UserProfileContext } from "../../contexts/UserProfile.Context";
import { IFetchError } from "../../lib/types/types";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import "react-image-crop/dist/ReactCrop.css";
import { handlePotentialAxiosError } from "../../lib/utilityFunctions";
import { postCreateIdea } from "../../lib/api/ideaRoutes";
import { postCreateCollabotator } from "src/lib/api/communityRoutes";

interface SingleIdeaPageContentProps {
  ideaData: IIdeaWithRelationship;
  proposalData: any;
}

const SingleProposalPageContent: React.FC<SingleIdeaPageContentProps> = ({
  ideaData,
  proposalData,
}) => {
  const {
    title,
    description,
    imagePath,
    userType,
    communityImpact,
    natureImpact,
    artsImpact,
    energyImpact,
    manufacturingImpact,
    createdAt,
    category,
    segment,
    subSegment,
    superSegment,
    author,
    state,

    // Proposal and Project info

    projectInfo,
  } = ideaData;

  const { id: proposalId } = proposalData;

  const { title: catTitle } = category!;

  const parsedDate = new Date(createdAt);

  // Social Media share for this Idea page
  // const shareUrl = 'http://github.com';
  // const shareUrl = 'https://app.mylivingcity.org'
  const shareUrl = window.location.href;
  const shareTitle = `My Living City Idea! ${title}`;

  /**
   * Checks to see if the Idea's state is of Proposal and if the proposal information
   * needed to render is available in an object.
   * @returns { boolean } Proposal information and state is valid
   */
  const confirmProposalState = (): boolean => {
    return state === "PROPOSAL";
  };

  /**
   * Checks to see if the Idea's state is of Project and if the project information
   * needed to render is available in an object.
   * @returns { boolean } Project information and state is valid
   */
  const confirmProjectState = (): boolean => {
    return state === "PROJECT" && !!projectInfo;
  };

  const shouldDisplayChampionButton = (): boolean => {
    return !ideaData.champion && !!ideaData.isChampionable;
  };

  function redirectToIdeaSubmit() {
    window.location.href = `/submit`;
  }

  const [collaboratorIsOpen, setCollaboratorIsOpen] = useState(false);
  const togglePopupCollaborator = () => {
    setCollaboratorIsOpen(!collaboratorIsOpen);
  };

  const [volunteerIsOpen, setVolunteerIsOpen] = useState(false);
  const togglePopupVoluteer = () => {
    setVolunteerIsOpen(!volunteerIsOpen);
  };

  const [donorIsOpen, setDonorIsOpen] = useState(false);
  const togglePopupDonor = () => {
    setDonorIsOpen(!donorIsOpen);
  };

  const [map, showMap] = useState(false);
  const { token, user } = useContext(UserProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IFetchError | null>(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });

  const collaboratorSubmitHandler = async (values: any) => {
    try {
      // Set loading and error state
      setError(null);
      setIsLoading(true);
      setTimeout(() => console.log("timeout"), 5000);
      const res = await postCreateCollabotator(
        proposalId,
        values,
        user!.banned,
        token
      );
      console.log("Here" + res);
      setError(null);
      //formikCollaborator.resetForm();
    } catch (error) {
      const genericMessage = "An error occured while trying to create an Idea.";
      const errorObj = handlePotentialAxiosError(genericMessage, error);
      setError(errorObj);
    } finally {
      setIsLoading(false);
    }
  };

  const formikCollaborator = useFormik({
    initialValues: {
      experience: "",
      role: "",
      time: "",
      contactInfo: "",
    },
    onSubmit: collaboratorSubmitHandler,
  });

  return (
    <div className="single-idea-content pt-5">
      <style>
        {`
        .canvasjs-chart-credit {
          display: none;
        }
        `}
      </style>
      <Card>
        {imagePath ? (
          <Image
            src={`${API_BASE_URL}/${imagePath}`}
            style={{ objectFit: "cover", height: "400px" }}
          ></Image>
        ) : null}
        <Row>
          <Col sm={12}>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <h1 className="h1">{capitalizeString(title)}</h1>
                <h4 className="text-center my-auto text-muted">
                  Status: <span>{state}</span>
                </h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <h4 className="h5">Category: {capitalizeString(catTitle)}</h4>
                  {/* <h4 className='h5'>Posted by: {author?.fname}@{author?.address?.streetAddress}</h4> */}
                  {/* <h4 className='h5'>As: {userType}</h4> */}
                  {superSegment ? (
                    <h4 className="h5">
                      District:{" "}
                      {superSegment
                        ? capitalizeFirstLetterEachWord(superSegment.name)
                        : "N/A"}
                    </h4>
                  ) : null}
                  {segment ? (
                    <h4 className="h5">
                      Municipality:{" "}
                      {segment
                        ? capitalizeFirstLetterEachWord(segment.name)
                        : "N/A"}
                    </h4>
                  ) : null}
                  {subSegment ? (
                    <h4 className="h5">
                      Neighborhood:{" "}
                      {subSegment
                        ? capitalizeFirstLetterEachWord(subSegment.name)
                        : "N/A"}
                    </h4>
                  ) : null}
                  {!!ideaData.champion && (
                    <h4 className="h5">
                      Championed By: {ideaData?.champion?.fname}@
                      {ideaData?.champion?.address?.streetAddress}
                    </h4>
                  )}
                  {/* <h5 className='h5'>Created: {parsedDate.toLocaleDateString()}</h5> */}
                  <br />
                  <p>{description}</p>
                  {communityImpact ? (
                    <p>
                      <strong>Community and Place:</strong> {communityImpact}
                    </p>
                  ) : null}
                  {natureImpact ? (
                    <p>
                      <strong>Nature and Food Security:</strong> {natureImpact}
                    </p>
                  ) : null}
                  {artsImpact ? (
                    <p>
                      <strong>Arts, Culture, and Education:</strong>{" "}
                      {artsImpact}
                    </p>
                  ) : null}
                  {energyImpact ? (
                    <p>
                      <strong>Water and Energy:</strong> {energyImpact}
                    </p>
                  ) : null}
                  {manufacturingImpact ? (
                    <p>
                      <strong>Manufacturing and Waste:</strong>{" "}
                      {manufacturingImpact
                        ? capitalizeString(manufacturingImpact)
                        : ""}
                    </p>
                  ) : null}
                </Col>
              </Row>
            </Card.Body>
          </Col>

          {/* Proposal State and Conditional Rendering */}
          {/*{(confirmProposalState() || confirmProjectState()) && (
            <Col sm={12} className="my-3">
              <h2>Proposal Information</h2>
              <p>
                {}
                {""}
              </p>
            </Col>
          )}*/}

          {/* Project State and Conditional Rendering */}
          {confirmProjectState() && (
            <Col sm={12} className="my-3">
              <h2>Project Information:</h2>
              <p>
                {projectInfo?.description ||
                  "Project has been initialized. Please describe the project!"}
              </p>
            </Col>
          )}

          {shouldDisplayChampionButton() && (
            <Col sm={12} className="my-3">
              <ChampionSubmit />
            </Col>
          )}

          {/* Share functionality */}

          <Col sm={12}>
            <Card.Footer className="mt-1 d-flex justify-content-between">
              <div>Posted: {parsedDate.toLocaleDateString()}</div>
              <div>
                <FacebookShareButton
                  className="mx-2"
                  url={shareUrl}
                  quote={shareTitle}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  className="mx-2"
                  url={shareUrl}
                  title={shareTitle}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  className="mx-2"
                  url={shareUrl}
                  title={shareTitle}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LineShareButton
                  className="mx-2"
                  url={shareUrl}
                  title={shareTitle}
                >
                  <LineIcon size={32} round />
                </LineShareButton>
                <RedditShareButton
                  className="mx-2"
                  url={shareUrl}
                  title={shareTitle}
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>
                <EmailShareButton
                  className="mx-2"
                  url={shareUrl}
                  title={shareTitle}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
              <div>
                {author?.fname}@{author?.address?.streetAddress} as {userType}
              </div>
            </Card.Footer>
          </Col>
        </Row>
      </Card>

      <div style={{ marginTop: "2rem" }}>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="h4">Collaborators</h4>
                <p>Join to be part of the project team</p>
              </div>

              <h4 className="text-center my-auto text-muted">
                <div className="collab">
                  <Button onClick={togglePopupCollaborator}>Join</Button>
                  {collaboratorIsOpen && (
                    <Popup
                      content={
                        <Form onSubmit={() => formikCollaborator.handleSubmit}>
                          <Form.Group>
                            <Form.Label>Experience</Form.Label>

                            <Form.Control
                              type="text"
                              name="experience"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.experience}
                              placeholder="What experience and skills do you bring to the
                              project?"
                            />
                            <br />

                            <Form.Label xs>Role</Form.Label>
                            <Form.Control
                              type="text"
                              name="role"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.role}
                              placeholder="What role or task would you would like to work on?"
                            />
                            <br />
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                              type="text"
                              name="time"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.time}
                              placeholder="How much time per week or per month do you have
                              available?"
                            />
                            <br />
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                              type="text"
                              name="contactInfo"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.contactInfo}
                              placeholder="What is your contact information (e-mail and/or
                              phone number)?"
                            />
                            <br />
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>
                      }
                      handleClose={togglePopupCollaborator}
                    />
                  )}
                </div>
              </h4>
            </div>
          </Card.Header>
          <Card.Body>
            <p style={{ padding: "0px" }}>Collaborator1@test ave</p>
            <p style={{ padding: "0px" }}>Collaborator2@test ave</p>
          </Card.Body>
        </Card>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="h4">Volunteers</h4>
                <p>Help support this project by becoming a volunteer</p>
              </div>
              <h4 className="text-center my-auto text-muted">
                <div className="volunteer">
                  <Button onClick={togglePopupVoluteer}>Sign Up</Button>
                  {volunteerIsOpen && (
                    <Popup
                      content={
                        <Form onSubmit={() => formikCollaborator.handleSubmit}>
                          <Form.Group>
                            <Form.Label>Experience</Form.Label>

                            <Form.Control
                              type="text"
                              name="experience"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.experience}
                              placeholder="What experience and skills do you bring to the project?"
                            />
                            <br />

                            <Form.Label xs>Task</Form.Label>
                            <Form.Control
                              type="text"
                              name="role"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.role}
                              placeholder="What type of task would you like to work on?"
                            />
                            <br />
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                              type="text"
                              name="time"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.time}
                              placeholder="How much time do you want to contribute?"
                            />
                            <br />
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                              type="text"
                              name="contactInfo"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.contactInfo}
                              placeholder="What is your contact information (e-mail and/or phone number)?"
                            />
                            <br />
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>
                      }
                      handleClose={togglePopupVoluteer}
                    />
                  )}
                </div>
              </h4>
            </div>
          </Card.Header>
          <Card.Body>
            <p style={{ padding: "0px" }}>Volunteer@test ave</p>
            <p style={{ padding: "0px" }}>Volunteer@test ave</p>
            <p style={{ padding: "0px" }}>Volunteer@test ave</p>
            <p style={{ padding: "0px" }}>Volunteer@test ave</p>
          </Card.Body>
        </Card>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="h4">Donors</h4>
                <p>Donate to help this project grow</p>
              </div>
              <h4 className="text-center my-auto text-muted">
                <div className="donor">
                  <Button onClick={togglePopupDonor}>Sign Up</Button>
                  {donorIsOpen && (
                    <Popup
                      content={
                        <Form onSubmit={() => formikCollaborator.handleSubmit}>
                          <Form.Group>
                            <Form.Label>Contribution</Form.Label>

                            <Form.Control
                              type="text"
                              name="experience"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.experience}
                              placeholder="What is your contact information (e-mail and/or phone number)?"
                            />

                            <br />
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                              type="text"
                              name="contactInfo"
                              onChange={formikCollaborator.handleChange}
                              value={formikCollaborator.values.contactInfo}
                              placeholder="What is your contact information (e-mail and/or
                          phone number)?"
                            />
                            <br />
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>
                      }
                      handleClose={togglePopupDonor}
                    />
                  )}
                </div>
              </h4>
            </div>
          </Card.Header>
          <Card.Body>
            <p style={{ padding: "0px" }}>Donor@test ave</p>
          </Card.Body>
        </Card>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between">
              <h4 className="h4">Suggested Ideas</h4>
              {/** create a textbox */}

              <h4 className="text-center my-auto text-muted">
                <Button onClick={() => redirectToIdeaSubmit()}>
                  Propose Idea
                </Button>
              </h4>
            </div>
          </Card.Header>
          <Card.Body>
            <Row sm={12} md={3}>
              <Col>
                <p style={{ padding: "0px" }}>Suggestor@test ave</p>
              </Col>
              <Col>
                <a style={{ padding: "0px" }} href={"/ideas/5"}>
                  Test
                </a>
              </Col>
            </Row>
            <Row sm={12} md={3}>
              <Col>
                <p style={{ padding: "0px" }}>Suggestor@test ave</p>
              </Col>
              <Col>
                <a style={{ padding: "0px" }} href={"/ideas/6"}>
                  Second Test
                </a>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <Row>
        <RatingsSection />
      </Row>
      <Row>
        <CommentsSection />
      </Row>
    </div>
  );
};

export default SingleProposalPageContent;
