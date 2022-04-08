import { Container, Row, Col } from "react-bootstrap";
import IdeaTile from "src/components/tiles/IdeaTile";
import { IIdeaWithAggregations } from "src/lib/types/data/idea.type";

interface MyPostsProps {
  userIdeas: IIdeaWithAggregations[];
}

const MyPosts: React.FC<MyPostsProps> = ({ userIdeas }) => {
  return (
    <Container
      className="system"
      id="hanging-icons"
      style={{ padding: "0rem 0rem 1rem 0rem", margin: "0 auto" }}
    >
      <h2 className="pb-1 border-bottom display-6 text-center">My Posts</h2>
      <Row className="g-5 py-3 justify-content-center">
        {userIdeas &&
          userIdeas.map((idea: any) => (
            <Col
              key={idea.id}
              md={6}
              lg={4}
              className="pt-3 align-items-stretch"
            >
              <IdeaTile ideaData={idea} showFooter={true} postType="Idea" />
            </Col>
          ))}
        {/* <a className='pt-5 text-align-center' href="/ideas">
          <h3>View all ideas and conversations</h3>
        </a> */}
      </Row>
    </Container>
  );
};

export default MyPosts;
