import { Button, Card, Col, Row } from 'react-bootstrap';
import { IIdeaWithRelationship } from '../../lib/types/data/idea.type';
import { capitalizeFirstLetterEachWord, capitalizeString } from '../../lib/utilityFunctions';
import CommentsSection from '../partials/SingleIdeaContent/CommentsSection';
import RatingsSection from '../partials/SingleIdeaContent/RatingsSection';
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
  WhatsappIcon
} from 'react-share'
import ChampionSubmit from '../partials/SingleIdeaContent/ChampionSubmit';
import { useSingleSegmentBySegmentId } from 'src/hooks/segmentHooks';
import LoadingSpinner from '../ui/LoadingSpinner';
import { ISegment } from 'src/lib/types/data/segment.type';
import { useState } from 'react';

interface SingleIdeaPageContentProps {
  ideaData: IIdeaWithRelationship
}

const SingleIdeaPageContent: React.FC<SingleIdeaPageContentProps> = ({ ideaData }) => {
  const {
    title,
    description,
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
    author,
    state,
    // segmentId,
    // subSegmentId,

    // Proposal and Project info
    proposalInfo,
    projectInfo,
  } = ideaData;
  console.log(ideaData);

  // const [subSegData, setSubSegData] = useState(subSegmentData);
  // console.log(subSegData);

  // if(subSegData){
  //   setSubSegData(subSegmentData);
  // } else {
  //   setSubSegData(undefined);
  // }

  const { title: catTitle } = category!;
  // const { name: SegmentName } = segmentData;
  // const { name: SubSegmentName } = subSegmentData;
  
  // const [subSegmentName, setSubSegmentName] = useState(subSegmentData.name);

  // if (subSegmentName) {
  //   setSubSegmentName(subSegmentData.name)
  // } else {
  //   setSubSegmentName("N/A");
  // }
  

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

  const shouldDisplayChampionButton = (): boolean => {
    console.log(!ideaData.champion);
    console.log(!!ideaData.isChampionable);
    console.log(ideaData.champion);
    console.log(ideaData.isChampionable);

    return !ideaData.champion && !!ideaData.isChampionable;
  }
  return (
    <div className='single-idea-content pt-5'>
      <Card className='bg-mlc-shade-grey' border="next">
      <Row >
        <Col sm={12}>
          <Card.Header>
          <div className="d-flex justify-content-between">
            <h1 className='h1'>{capitalizeString(title)}</h1>
            <h4 className='text-center my-auto text-muted'>Status: <span>{state}</span></h4>
          </div>
          </Card.Header>
          <Card.Body>
          <h4 className='h5'>Category: {capitalizeString(catTitle)}</h4>
          {/* <h4 className='h5'>Posted by: {author?.fname}@{author?.address?.streetAddress}</h4> */}
          {/* <h4 className='h5'>As: {userType}</h4> */}
          <h4 className='h5'>Municipality: {segment ? capitalizeFirstLetterEachWord(segment.name) : 'N/A'}</h4>
          {subSegment ? <h4 className='h5'>Neighborhood: {subSegment ? capitalizeFirstLetterEachWord(subSegment.name): 'N/A'}</h4> : null}
          {!!ideaData.champion && (
            <h4 className='h5'>Championed By: {ideaData?.champion?.fname}@{ideaData?.champion?.address?.streetAddress}</h4>
          )}
          {/* <h5 className='h5'>Created: {parsedDate.toLocaleDateString()}</h5> */}
          <br />
          <p>{description}</p>
          {communityImpact ? <p><strong>Community and Place:</strong> {communityImpact}</p> : null}
          {natureImpact ? <p><strong>Nature and Food Security:</strong> {natureImpact}</p> : null}
          {artsImpact ? <p><strong>Arts, Culture, and Education:</strong> {artsImpact}</p> : null}
          {energyImpact ? <p><strong>Water and Energy:</strong> {energyImpact}</p> : null}
          {manufacturingImpact ? <p><strong>Manufacturing and Waste:</strong> {manufacturingImpact ? capitalizeString(manufacturingImpact) : ""}</p> : null}
          </Card.Body>
        </Col>

        {/* Proposal State and Conditional Rendering */}
        {(confirmProposalState() || confirmProjectState()) && (
          <Col sm={12} className='my-3'>
            <h2>Proposal Information</h2>
            <p>{proposalInfo?.description || "Proposal has been initialized. Please describe the proposal!"}</p>
          </Col>
        )}

        {/* Project State and Conditional Rendering */}
        {confirmProjectState() && (
          <Col sm={12} className='my-3'>
            <h2>Project Information:</h2>
            <p>{projectInfo?.description || "Project has been initialized. Please describe the project!"}</p>
          </Col>
        )}

        {shouldDisplayChampionButton() && (
          <Col sm={12} className='my-3'>
            <ChampionSubmit />
          </Col>
        )}

        {/* Share functionality */}
        
        <Col sm={12}>
        <Card.Footer className='mt-1 d-flex justify-content-between'>
          <div>Posted: {parsedDate.toLocaleDateString()}</div>
          <div>
          <FacebookShareButton
            className='mx-2'
            url={shareUrl}
            quote={shareTitle}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            className='mx-2'
            url={shareUrl}
            title={shareTitle}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton
            className='mx-2'
            url={shareUrl}
            title={shareTitle}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LineShareButton
            className='mx-2'
            url={shareUrl}
            title={shareTitle}
          >
            <LineIcon size={32} round />
          </LineShareButton>
          <RedditShareButton
            className='mx-2'
            url={shareUrl}
            title={shareTitle}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
          <EmailShareButton
            className='mx-2'
            url={shareUrl}
            title={shareTitle}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
          </div>
          <div>{author?.fname}@{author?.address?.streetAddress} as {userType}</div>
          </Card.Footer>
        </Col>
      </Row>
      </Card>
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