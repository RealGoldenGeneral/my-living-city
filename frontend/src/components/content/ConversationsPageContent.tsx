import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IIdeaWithAggregations } from "../../lib/types/data/idea.type";
import IdeaTile from "../tiles/IdeaTile";

interface ConversationsPageContentProps {
  ideas: IIdeaWithAggregations[] | undefined;
  proposals: IIdeaWithAggregations[] | undefined;
}

// sorting and parsing ideas here

const ConversationsPageContent: React.FC<ConversationsPageContentProps> = ({
  ideas,
  proposals,
}) => {
  return (
    <Container className="conversations-page-content">
      <h3 style={{ paddingTop: "1rem" }}>Proposals</h3>
      <hr />
      <Row>
        {proposals &&
          proposals.map((proposal) => (
            <Col
              key={proposal.id}
              md={6}
              lg={4}
              className="pt-3 align-items-stretch"
            >
              <IdeaTile
                ideaData={proposal}
                showFooter={true}
                postType={"Proposal"}
              />
            </Col>
          ))}
      </Row>
      <h3 style={{ marginTop: "1rem" }}>Ideas</h3>
      <hr style={{ paddingBottom: "0rem", marginBottom: "0rem" }} />
      <Row>
        {ideas &&
          ideas.map((idea) => (
            <Col key={idea.id} className="col-card" xs={12} md={6} lg={4}>
              <IdeaTile ideaData={idea} showFooter={true} postType={"Idea"} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ConversationsPageContent;
