import { Col, Container, Row } from 'react-bootstrap';
import { Comment } from '../../../lib/types/data/comment.type';
import { timeDifference } from '../../../lib/utilityFunctions';
import IdeaCommentLike from './IdeaCommentLike';

interface IdeaCommentTileProps {
  commentData: Comment;
}

const IdeaCommentTile = ({ commentData }: IdeaCommentTileProps) => {
  const {
    id,
    authorId,
    content,
    createdAt,
    updatedAt,
  } = commentData;

  const { email, fname, lname } = commentData?.author;

  const submitLikeHandler = () => {
    console.log("Like comment")
  }

  return (
    <Container fluid className='my-1'>
      <Row className='justify-content-center'>
        <Col className='mx-2'>
          <div className="d-flex flex-column justify-content-start">
            <span className="name d-block font-weight-bold">{email}</span>
            <span className="date text-black-50">
              Shared publicly - {timeDifference(new Date(), new Date(createdAt))}
            </span>
          </div>
          <div className="mt-2">
            {content}
          </div>
          {/* <IdeaCommentLike /> */}
          <p>{JSON.stringify(commentData)}</p>
        </Col>
      </Row>
      <hr className="bg-info" />
    </Container>
  );
}

export default IdeaCommentTile