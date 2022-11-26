import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Carousel } from "react-bootstrap";
import { IIdeaWithAggregations } from "../../lib/types/data/idea.type";
import { IProposalWithAggregations } from "src/lib/types/data/proposal.type";
import IdeaTile from "../tiles/IdeaTile";
import ProposalTile from "../tiles/ProposalTile";
import PlaceholderIdeaTile from "../tiles/PlaceholderIdeaTile";

interface ConversationsPageContentProps {
  ideas: IIdeaWithAggregations[] | undefined;
  proposals: IProposalWithAggregations[] | undefined;
}

// sorting and parsing ideas here


const ConversationsPageContent: React.FC<ConversationsPageContentProps> = ({
  ideas,
  proposals,
}) => {

  let ideaTotalPages = Math.ceil(ideas!.length / 6)
  let proposalTotalPages = Math.ceil(proposals!.length / 6)
  return (
    <Container className="conversations-page-content">
      <style>
        {`
        .carousel-control-next,
        .carousel-control-prev {
            filter: invert(100%);
        }
        .carousel-control-next {
            right: -8rem;
        }
        .carousel-control-prev {
            left: -8rem;
        }
        .carousel-item.active, .carousel-item-next, .carousel-item-prev {
          display: flex;
          flex-wrap: wrap;
        }
        .container {
          padding-left: 0;
          padding-right: 0;
        }
        .carousel-indicators {
          display: none;
        `}
      </style>

      <h3 style={{ paddingTop: "1rem" }}>Proposals</h3>
      <hr />
      { proposals && proposals.length > 0 ? (<Carousel controls={true} interval={null} slide={true} fade={false}>
        {[...Array(proposalTotalPages)].map((x, i) => (
          <Carousel.Item key={i} >
            {proposals
              ? proposals.slice(i * 6, i * 6 + 6).map((proposal) => {
                return proposal && 
                (
                  <Col
                    key={proposal.id}
                    md={6}
                    lg={4}
                    className="pt-3 align-items-stretch"
                  >
                    <ProposalTile
                      proposalData={proposal}
                      showFooter={true}
                      
                    />
                  </Col>
                ) })
              : [...Array(12)].map((x, i) => (
                  <Col
                    key={i}
                    md={6}
                    lg={4}
                    className="pt-3 align-items-stretch"
                  >
                    <PlaceholderIdeaTile />
                  </Col>
                ))}
          </Carousel.Item>
        ))}
      </Carousel>) : <div>Sorry, there are no proposals submitted yet.</div> }
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <h3 style={{ paddingTop: "1rem" }}>Ideas</h3>
      <hr />
      {ideas && ideas.length > 0 ? (<Carousel controls={true} interval={null} slide={true} fade={false}>
        {[...Array(ideaTotalPages)].map((x, i) => (
          <Carousel.Item key={i} id='slick'>
            {ideas
              ? ideas.slice(i * 6, i * 6 + 6).map((idea) => {
                return idea && idea.active ? 
                (
                  <Col
                    key={idea.id}
                    md={6}
                    lg={4}
                    className="pt-3 align-items-stretch"
                  >
                    <IdeaTile
                      ideaData={idea}
                      showFooter={true}
                      postType={idea.state === "IDEA" ? "Idea" : "Proposal"}
                    />
                  </Col>
                ) : null})
              : [...Array(12)].map((x, i) => (
                  <Col
                    key={i}
                    md={6}
                    lg={4}
                    className="pt-3 align-items-stretch"
                  >
                    <PlaceholderIdeaTile />
                  </Col>
                ))}
          </Carousel.Item>
        ))}
      </Carousel>) : <div>Sorry, there are no ideas submitted yet!</div>}
    </Container>
  );
};

export default ConversationsPageContent;
