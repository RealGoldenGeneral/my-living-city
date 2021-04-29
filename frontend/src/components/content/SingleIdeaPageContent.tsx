import { Col, Row } from 'react-bootstrap';
import { IIdeaWithRelationship } from '../../lib/types/data/idea.type';
import { capitalizeString } from '../../lib/utilityFunctions';
import CommentsSection from '../partials/SingleIdeaContent/CommentsSection';
import RatingsSection from '../partials/SingleIdeaContent/RatingsSection';

interface SingleIdeaPageContentProps {
  ideaData: IIdeaWithRelationship
}

const SingleIdeaPageContent: React.FC<SingleIdeaPageContentProps> = ({ ideaData }) => {
  const {
    title,
    description,
    communityImpact,
    natureImpact,
    artsImpact,
    energyImpact,
    manufacturingImpact,
    createdAt,
    category,
    author,
    state,

    // Proposal and Project info
    proposalInfo,
    projectInfo,
  } = ideaData;

  const { title: catTitle } = category!;
  const parsedDate = new Date(createdAt);

  /**
   * Checks to see if the Idea's state is of Proposal and if the proposal information
   * needed to render is available in an object.
   * @returns { boolean } Proposal information and state is valid
   */
  const confirmProposalState = (): boolean => {
    return state === 'PROPOSAL' && !!proposalInfo;
  }

  /**
   * Checks to see if the Idea's state is of Project and if the project information
   * needed to render is available in an object.
   * @returns { boolean } Project information and state is valid
   */
  const confirmProjectState = (): boolean => {
    return state === 'PROJECT' && !!projectInfo;
  }

  return (
    <div className='single-idea-content pt-1'>
      <Row className='bg-mlc-shade-grey py-5'>
        <Col sm={12}>
          <div className="d-flex justify-content-between">
            <h1 className='h1'>{capitalizeString(title)}</h1>
            <h4 className='text-center my-auto text-muted'>Status: <span>{state}</span></h4>
          </div>
          <h4 className='h5'>Category: {capitalizeString(catTitle)}</h4>
          <h4 className='h5'>Posted by: {author?.fname}@{author?.address?.streetAddress}</h4>
          <h5 className='h5'>Created: {parsedDate.toLocaleDateString()}</h5>
          <br />
          <p>{description}</p>
          <p><strong>Community and place:</strong> {communityImpact}</p>
          <p><strong>Nature and Food Security:</strong> {natureImpact}</p>
          <p><strong>Arts, Culture, and Education:</strong> {artsImpact}</p>
          <p><strong>Water and Energy:</strong> {energyImpact}</p>
          <p><strong>Manufacturing and Waste:</strong> {manufacturingImpact ? capitalizeString(manufacturingImpact) : ""}</p>
        </Col>
        {(confirmProposalState() || confirmProjectState()) && (
          <Col sm={12} className='my-3'>
            <h2>Proposal Information</h2>
            <p>{proposalInfo?.description || "Proposal has been initialized. Please describe the proposal!"}</p>
          </Col>
        )}
        {confirmProjectState() && (
          <Col sm={12} className='my-3'>
            <h2>Project Information:</h2>
            <p>{projectInfo?.description || "Project has been initialized. Please describe the project!"}</p>
          </Col>
        )}
      </Row>
      <Row>
        <RatingsSection />
      </Row>
      <Row>
        <CommentsSection />
      </Row>
    </div>
  );
}

export default SingleIdeaPageContent