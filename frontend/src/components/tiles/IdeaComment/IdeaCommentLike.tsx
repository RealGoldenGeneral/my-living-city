import React from 'react'
import { FaRegThumbsUp } from 'react-icons/fa'

interface IdeaCommentLikeProps {

}

const IdeaCommentLike = (props: IdeaCommentLikeProps) => {

  const submitLikeHandler = () => {
    console.log('Like comment');
  }

  return (
    // TODO: Implement logic to like a comment
    <div className="d-flex flex-row fs-12">
      <div
        className="like p-2"
        onClick={() => submitLikeHandler()}
      >
        <FaRegThumbsUp />
        <span className="ml-1">Like</span>
      </div>
    </div>
  );
}

export default IdeaCommentLike