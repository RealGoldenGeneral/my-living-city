import { useContext } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UserProfileContext } from 'src/contexts/UserProfile.Context';
import { createCommentFlagUnderIdea, compareCommentFlagsWithThreshold } from 'src/lib/api/flagRoutes';
import { updateCommentStatus } from 'src/lib/api/commentRoutes';
import { IComment } from '../../../lib/types/data/comment.type';
import { timeDifference } from '../../../lib/utilityFunctions';
import IdeaCommentDislike from './IdeaCommentDislike';
import IdeaCommentLike from './IdeaCommentLike';

interface IdeaCommentTileProps {
  commentData: IComment;
}

const IdeaCommentTile = ({ commentData }: IdeaCommentTileProps) => {
  const { token, user, isUserAuthenticated } = useContext(UserProfileContext);
  
  const {
    id,
    ideaId,
    idea,
    authorId,
    reviewed,
    content,
    createdAt,
    updatedAt,
    _count: {
      likes,
      dislikes
    }
  } = commentData;
  
  const { email, fname, lname, address, userSegments, userType } = commentData?.author;
  const {segmentId, subSegmentId, superSegmentId} = commentData?.idea;
  const {homeSegmentId, workSegmentId, schoolSegmentId, homeSubSegmentId, workSubSegmentId, schoolSubSegmentId, homeSuperSegmentId, workSuperSegmentId, schoolSuperSegmentId} = userSegments;
  const colouredUserNameHandle = (ideaId: number, homeId?:number, workId?:number, schoolId?:number) => {
    // let ideaId, homeId, workId, schoolId;
    // if(superSegmentId){
    //   ideaId = superSegmentId;
    // }else{

    // }
    let userName = `${fname}@${address.streetAddress}`;
    let colour = '';
    if(userType === 'ADMIN') {
      userName += " as Admin";
      colour = 'text-danger';
    }
    else if(userType === 'MOD') {
      userName += " as Mod";
      colour = 'text-warning';
    }else if(userType === 'MUNICIPAL'){
      userName = "Municipal Account";
      colour = 'text-warning';
    }
    else{
      switch(ideaId){
        case homeId:
          userName += " as Resident"
          colour = 'text-primary'
          break;
        case workId:
          userName += " as Worker"
          colour = 'text-next'
          break;
        case schoolId:
          userName += " as Student"
          colour = 'text-next'
          break;
      }
    }
    return(<span className={`name d-block font-weight-bold ${colour}`}>{userName}</span>)
  }
  const createCommentFlagAndCheckThreshold = async(commentId: number, token: string, userId: string, quarantined_at: Date) => {
    await createCommentFlagUnderIdea(commentId, token!);
    const thresholdExceeded = await compareCommentFlagsWithThreshold(commentId, token!);
    await updateCommentStatus(token, userId, commentId.toString(), !thresholdExceeded, false, quarantined_at);
  }

  return (
    <Container fluid className='my-1'>
      <Row className='justify-content-center'>
        <Col className='mx-2'>
          <div className="d-flex flex-column justify-content-start">
            {superSegmentId ? colouredUserNameHandle(superSegmentId, homeSuperSegmentId, workSuperSegmentId, schoolSuperSegmentId)
            :  <> 
            {subSegmentId ? 
              colouredUserNameHandle(subSegmentId, homeSubSegmentId, workSubSegmentId, schoolSubSegmentId)
              :
              colouredUserNameHandle(segmentId, homeSegmentId, workSegmentId, schoolSegmentId)}
            </>
          }
            
            <span className="date text-black-50">
              Shared publicly - {timeDifference(new Date(), new Date(createdAt))}
            </span>
          </div>
          <div className="mt-2">
            {content}
          </div>
          <div>
            Likes and Dislikes: {likes} / {dislikes}
          </div>
          {isUserAuthenticated() && (
            <div className='d-flex'>
              <IdeaCommentLike commentData={commentData} />
              <IdeaCommentDislike commentData={commentData} />
              {!reviewed ? (
              <Button onClick={
                async () => await createCommentFlagAndCheckThreshold(id, token!, user!.id, new Date())
              }>Flag</Button>
              ) : null}
            </div>
          )}
        </Col>
      </Row>
      <hr className="bg-primary" />
    </Container>
  );
}

export default IdeaCommentTile