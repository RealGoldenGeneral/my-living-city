import {
  Button,
  Card,
  Col,
  Row,
  Image,
  Form,
  Modal,
  Alert,
  Accordion,
  Table,
} from "react-bootstrap";
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
import {
  postCreateCollabotator,
  postCreateVolunteer,
  postCreateDonor,
} from "src/lib/api/communityRoutes";

interface SingleIdeaPageContentProps {
  ideaData: IIdeaWithRelationship;
  proposalData: any;
  ideaId: string;
}

const SingleProposalPageContent: React.FC<SingleIdeaPageContentProps> = ({
  ideaData,
  proposalData,
  ideaId,
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

  const parsedIdeaId = ideaId;

  const {
    id: proposalId,
    suggestedIdeas,
    collaborations,
    volunteers,
    donors,
    needCollaborators,
    needVolunteers,
    needDonations,
    needFeedback,
    needSuggestions,
    location,
  } = proposalData;
  // console.log(proposalData);
  // console.log(suggestedIdeas);

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
    window.location.href = `/submit?supportedProposal=${proposalId}`;
  }

  const [donorIsOpen, setDonorIsOpen] = useState(false);
  const togglePopupDonor = () => {
    setDonorIsOpen(!donorIsOpen);
  };

  const { token, user } = useContext(UserProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IFetchError | null>(null);

  const [modalShowCollaborator, setModalShowCollaborator] = useState(false);
  const [modalShowVolunteer, setModalShowVolunteer] = useState(false);
  const [modalShowDonor, setModalShowDonor] = useState(false);

  const collaboratorSubmitHandler = async (values: any) => {
    try {
      // Set loading and error state
      console.log("values", values);
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
      formikCollaborator.resetForm();
      window.location.reload();
    } catch (error) {
      const genericMessage = "An error occured while trying to create an Idea.";
      const errorObj = handlePotentialAxiosError(genericMessage, error);
      setError(errorObj);
    } finally {
      setIsLoading(false);
    }
  };

  const volunteerSubmitHandler = async (values: any) => {
    try {
      // Set loading and error state
      console.log("values", values);
      setError(null);
      setIsLoading(true);
      setTimeout(() => console.log("timeout"), 5000);
      const res = await postCreateVolunteer(
        proposalId,
        values,
        user!.banned,
        token
      );
      console.log("Here" + res);
      setError(null);
      formikVolunteer.resetForm();
      window.location.reload();
    } catch (error) {
      const genericMessage = "An error occured while trying to create an Idea.";
      const errorObj = handlePotentialAxiosError(genericMessage, error);
      setError(errorObj);
    } finally {
      setIsLoading(false);
    }
  };

  const donorSubmitHandler = async (values: any) => {
    try {
      // Set loading and error state
      console.log("values", values);
      setError(null);
      setIsLoading(true);
      setTimeout(() => console.log("timeout"), 5000);
      const res = await postCreateDonor(
        proposalId,
        values,
        user!.banned,
        token
      );
      console.log("Here" + res);
      setError(null);
      formikDonor.resetForm();
      window.location.reload();
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

  const formikVolunteer = useFormik({
    initialValues: {
      experience: "",
      task: "",
      time: "",
      contactInfo: "",
    },
    onSubmit: volunteerSubmitHandler,
  });

  const formikDonor = useFormik({
    initialValues: {
      donations: "",
      contactInfo: "",
    },
    onSubmit: donorSubmitHandler,
  });

  const [followingPost, setFollowingPost] = useState(false);

  const addIdeaToUserFollowList = () => {
    console.log("addIdeaToUserFollowList");
    console.log("proposalData", proposalData);
    setFollowingPost(!followingPost);
  };

  return (
    <div className="single-idea-content pt-5">
      <style>
        {`
        .canvasjs-chart-credit {
          display: none;
        }
        .mouse-pointer:hover {
          cursor: pointer;
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
                <Button
                  style={{ height: "3rem" }}
                  onClick={() => addIdeaToUserFollowList()}
                >
                  {followingPost ? "Unfollow" : "Follow"}
                </Button>
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
                  {location ? (
                    <h4 className="h5">Location: {location}</h4>
                  ) : null}
                  {!!ideaData.champion && (
                    <h4 className="h5">
                      Championed By: {ideaData?.champion?.fname}@
                      {ideaData?.champion?.address?.streetAddress}
                    </h4>
                  )}
                  {/* <h5 className='h5'>Created: {parsedDate.toLocaleDateString()}</h5> */}

                  {state ? (
                    <h4 className="h5">
                      Status: <span>{state}</span>
                    </h4>
                  ) : null}

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
                  <Button
                    variant="primary"
                    onClick={() => setModalShowCollaborator(true)}
                  >
                    Join
                  </Button>
                  <Modal
                    show={modalShowCollaborator}
                    onHide={() => setModalShowCollaborator(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Collaborate
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={formikCollaborator.handleSubmit}>
                        <Form.Group>
                          <p style={{ fontSize: "1rem" }}>Contact</p>
                          <Form.Control
                            type="text"
                            name="contactInfo"
                            onChange={formikCollaborator.handleChange}
                            value={formikCollaborator.values.contactInfo}
                            placeholder="What is your contact information (e-mail and/or phone number)?"
                          />
                          <br />
                          <p style={{ fontSize: "1rem" }}>Time</p>
                          <Form.Control
                            type="text"
                            name="time"
                            onChange={formikCollaborator.handleChange}
                            value={formikCollaborator.values.time}
                            placeholder="How much time per week or per month do you have
                                available?"
                          />
                          <br />
                          <p style={{ fontSize: "1rem" }}>Experience</p>
                          <Form.Control
                            type="text"
                            name="experience"
                            onChange={formikCollaborator.handleChange}
                            value={formikCollaborator.values.experience}
                            placeholder="What experience and skills do you bring to the
                                project?"
                          />
                          <br />

                          <p style={{ fontSize: "1rem" }}>Role</p>
                          <Form.Control
                            type="text"
                            name="role"
                            onChange={formikCollaborator.handleChange}
                            value={formikCollaborator.values.role}
                            placeholder="What role or task would you would like to work on?"
                          />
                          <br />

                          {error && (
                            <Alert variant="danger" className="error-alert">
                              {error.message}
                            </Alert>
                          )}
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={isLoading ? true : false}
                        >
                          {isLoading ? "Saving..." : "Submit"}
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </div>
              </h4>
            </div>
          </Card.Header>
          <Card.Body>
            <Accordion>
              {collaborations.length > 0 ? (
                collaborations.map((collaboration: any, index: number) => (
                  <Card key={index}>
                    <Accordion.Toggle
                      as={Card.Header}
                      variant="link"
                      eventKey={index.toString()}
                      className="mouse-pointer"
                    >
                      {collaboration.author.fname} {collaboration.author.lname}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index.toString()}>
                      <Card.Body>
                        <Table style={{ margin: "0rem" }}>
                          <thead>
                            <tr>
                              <th>Contact</th>
                              <th>Time</th>
                              <th>Experience</th>
                              <th>Role</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{collaboration.contactInfo}</td>
                              <td>{collaboration.time}</td>
                              <td>{collaboration.experience}</td>
                              <td>{collaboration.role}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))
              ) : (
                <p style={{ margin: "0rem", textAlign: "center" }}>
                  No collaborators yet, be the first!
                </p>
              )}
            </Accordion>
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
                  <Button
                    variant="primary"
                    onClick={() => setModalShowVolunteer(true)}
                  >
                    Sign-up
                  </Button>
                  <Modal
                    show={modalShowVolunteer}
                    onHide={() => setModalShowVolunteer(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Volunteer
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={formikVolunteer.handleSubmit}>
                        <Form.Group>
                          <p style={{ fontSize: "1rem" }}>Contact</p>
                          <Form.Control
                            type="text"
                            name="contactInfo"
                            onChange={formikVolunteer.handleChange}
                            value={formikVolunteer.values.contactInfo}
                            placeholder="What is your contact information (e-mail and/or phone number)?"
                          />
                          <br />
                          <p style={{ fontSize: "1rem" }}>Time</p>
                          <Form.Control
                            type="text"
                            name="time"
                            onChange={formikVolunteer.handleChange}
                            value={formikVolunteer.values.time}
                            placeholder="How much time do you want to contribute?"
                          />
                          <br />

                          <p style={{ fontSize: "1rem" }}>Experience</p>

                          <Form.Control
                            type="text"
                            name="experience"
                            onChange={formikVolunteer.handleChange}
                            value={formikVolunteer.values.experience}
                            placeholder="What experience and skills do you bring to the project?"
                          />
                          <br />

                          <p style={{ fontSize: "1rem" }}>Task</p>
                          <Form.Control
                            type="text"
                            name="task"
                            onChange={formikVolunteer.handleChange}
                            value={formikVolunteer.values.task}
                            placeholder="What type of task would you like to work on?"
                          />
                          <br />

                          {error && (
                            <Alert variant="danger" className="error-alert">
                              {error.message}
                            </Alert>
                          )}
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={isLoading ? true : false}
                        >
                          {isLoading ? "Saving..." : "Submit"}
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </div>
              </h4>
            </div>
          </Card.Header>
          <Card.Body>
            <Accordion>
              {volunteers.length > 0 ? (
                volunteers.map((volunteer: any, index: number) => (
                  <Card key={index}>
                    <Accordion.Toggle
                      as={Card.Header}
                      variant="link"
                      eventKey={index.toString()}
                      className="mouse-pointer"
                    >
                      {volunteer.author.fname} {volunteer.author.lname}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index.toString()}>
                      <Card.Body>
                        <Table style={{ margin: "0rem" }}>
                          <thead>
                            <tr>
                              <th>Contact</th>
                              <th>Time</th>
                              <th>Experience</th>
                              <th>Task</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{volunteer.contactInfo}</td>
                              <td>{volunteer.time}</td>
                              <td>{volunteer.experience}</td>
                              <td>{volunteer.task}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))
              ) : (
                <p style={{ margin: "0rem", textAlign: "center" }}>
                  No volunteers yet, be the first!
                </p>
              )}
            </Accordion>
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
                  <Button
                    variant="primary"
                    onClick={() => setModalShowDonor(true)}
                  >
                    Donate
                  </Button>
                  <Modal
                    show={modalShowDonor}
                    onHide={() => setModalShowDonor(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Donate
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={formikDonor.handleSubmit}>
                        <Form.Group>
                          <p style={{ fontSize: "1rem" }}>Donation</p>
                          <Form.Control
                            type="text"
                            name="donations"
                            onChange={formikDonor.handleChange}
                            value={formikDonor.values.donations}
                            placeholder="What would you like to contribute?"
                          />
                          <br />
                          <p style={{ fontSize: "1rem" }}>Contact</p>
                          <Form.Control
                            type="text"
                            name="contactInfo"
                            onChange={formikDonor.handleChange}
                            value={formikDonor.values.contactInfo}
                            placeholder="What is your contact information (e-mail and/or phone number)?"
                          />
                          <br />
                          {error && (
                            <Alert variant="danger" className="error-alert">
                              {error.message}
                            </Alert>
                          )}
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={isLoading ? true : false}
                        >
                          {isLoading ? "Saving..." : "Submit"}
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </div>
              </h4>
            </div>
          </Card.Header>
          <Card.Body>
            <Accordion>
              {donors.length > 0 ? (
                donors.map((donor: any, index: number) => (
                  <Card key={index}>
                    <Accordion.Toggle
                      as={Card.Header}
                      variant="link"
                      eventKey={index.toString()}
                      className="mouse-pointer"
                    >
                      {donor.author.fname} {donor.author.lname}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index.toString()}>
                      <Card.Body>
                        <Table style={{ margin: "0rem" }}>
                          <thead>
                            <tr>
                              <th>Contact</th>
                              <th>Donation</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{donor.contactInfo}</td>
                              <td>{donor.donations}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))
              ) : (
                <p style={{ margin: "0rem", textAlign: "center" }}>
                  No donations yet, be the first!
                </p>
              )}
            </Accordion>
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
            <Accordion>
              {suggestedIdeas.length > 0 ? (
                suggestedIdeas.map((idea: any, index: number) => (
                  <Card key={index}>
                    <Accordion.Toggle
                      as={Card.Header}
                      variant="link"
                      eventKey={index.toString()}
                      className="mouse-pointer"
                    >
                      {idea.author.fname} {idea.author.lname}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index.toString()}>
                      <Card.Body>
                        <Table style={{ margin: "0rem" }}>
                          <thead>
                            <tr>
                              <th>Author</th>
                              <th>Idea</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {idea.author.fname} {idea.author.lname}
                              </td>
                              <td>
                                <a href={"/ideas/" + idea.id}>{idea.title}</a>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))
              ) : (
                <p style={{ margin: "0rem", textAlign: "center" }}>
                  No donations yet, be the first!
                </p>
              )}
            </Accordion>
          </Card.Body>
        </Card>
      </div>

      <Row>
        <RatingsSection />
      </Row>
      <Row>
        <CommentsSection ideaId={parsedIdeaId} />
      </Row>
    </div>
  );
};

export default SingleProposalPageContent;
