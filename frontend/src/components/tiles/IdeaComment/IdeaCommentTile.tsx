import { Col, Container, Row } from 'react-bootstrap';
import { Comment } from '../../../lib/types/data/comment.type';
import { timeDifference } from '../../../lib/utilityFunctions';
import IdeaCommentLike from './IdeaCommentLike';

interface IdeaCommentTileProps {
  commentData: Comment
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
    // <Container>
    //   <p><strong>{ email }</strong></p>
    //   <p>{ content }</p>
    // </Container>
    <>
    <Container className='my-1'>
      <Row className='justify-content-center'>
        <Col className='mx-2'>
          <div className="d-flex flex-column justify-content-start">
            <span className="name d-block font-weight-bold">{ email }</span>
            <span className="date text-black-50">
              Shared publicly - {timeDifference(new Date(), new Date(createdAt))}
            </span>
          </div>
          <div className="mt-2">
            { content }
          </div>
          <IdeaCommentLike />
        </Col>
      </Row>
      <hr className="bg-info"/>
    </Container>
{/* 
    <div className="container mt-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-8">
          <div className="d-flex flex-column comment-section">
            <div className="bg-white p-2">
              <div className="d-flex flex-row user-info">
                <img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40" />
                <div className="d-flex flex-column justify-content-start ml-2">
                  <span className="d-block font-weight-bold name">Marry Andrews</span>
                  <span className="date text-black-50">Shared publicly - Jan 2020</span>
                </div>
              </div>
              <div className="mt-2">
                <p className="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
            <div className="bg-white">
              <div className="d-flex flex-row fs-12">
                <div className="like p-2 cursor"><i className="fa fa-thumbs-o-up"></i><span className="ml-1">Like</span></div>
                <div className="like p-2 cursor"><i className="fa fa-commenting-o"></i><span className="ml-1">Comment</span></div>
                <div className="like p-2 cursor"><i className="fa fa-share"></i><span className="ml-1">Share</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </>
  );
}

export default IdeaCommentTile
    // <Container>
    //   <p>I am a comment</p>
    // </Container>