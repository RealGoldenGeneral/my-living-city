import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
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
  const [filteredProposals, setfilteredProposals] = useState<IProposalWithAggregations[]>([])
  const [filteredIdeas, setfilteredIdeas] = useState<IIdeaWithAggregations[]>([])

  const [nextStart, setNextStart] = useState<number>(3)
  const [nextOffset, setNextOffset] = useState<number>(3)
  const [nextEnd, setNextEnd] = useState<number>(6)
  const [preStart, setPrevStart] = useState<number>(nextStart)

  const [prevEnd, setPrevEnd] = useState<number>(nextEnd)
  const [totalProposalsCount, setToalProposalsCount] = useState<number>(6)
  const [totalIdeasCount, setToalIdeasCount] = useState<number>(6)


  const [nextStartIdea, setNextStartIdea] = useState<number>(3)
  const [nextOffsetIdea, setNextOffsetIdea] = useState<number>(3)
  const [nextEndIdea, setNextEndIdea] = useState<number>(6)
  const [preStartIdea, setPrevStartIdea] = useState<number>(nextStartIdea)

  const [prevEndIdea, setPrevEndIdea] = useState<number>(nextEndIdea)
  const [prevOffsetIdea, setPrevOffsetIdea] = useState<number>(3)
  console.log("Next end idea", nextEndIdea)
  let start: number
  let offset: number
  let end: number
  let i: number
  let j: number
  let updatedProposals: Array<IProposalWithAggregations>
  let updatedIdeas: Array<IIdeaWithAggregations>
  const btnNext = document.getElementById('btnNext') as HTMLButtonElement | null;
  const btnPrev = document.getElementById('btnPrev') as HTMLButtonElement | null;

  const btnNextIdea = document.getElementById('btnNextIdea') as HTMLButtonElement | null;
  const btnPrevIdea = document.getElementById('btnPrevIdea') as HTMLButtonElement | null;
  useEffect(() => {

    updatedProposals = []
    updatedIdeas = []
    i = 0
    j = 0
    start = 3
    offset = 3
    end = start + offset
    for (i; i < 3; i++) {
      if (proposals) {
        updatedProposals.push(proposals[i])
      }
    }
    for (j; j < 3; j++) {
      if (ideas) {
        updatedIdeas.push(ideas[j])
      }
    }

    setfilteredProposals(updatedProposals)
    setfilteredIdeas(updatedIdeas)
    console.log("New filtered ideas:", filteredIdeas)
    console.log("Filtered proposals", filteredProposals)
  }, [])


  if (btnPrev != null && nextStart == 3) {
    btnPrev.disabled = true

  }

  if (btnPrevIdea != null && nextStartIdea == 3) {

    btnPrevIdea.disabled = true
  }

  const paginationNext = () => {
    console.log("clicked")
    console.log("end", nextEnd)
    console.log("start", nextStart)
    console.log("offset", nextOffset)

    setNextEnd(nextOffset + nextEnd)
    console.log(nextEnd)
    console.log("Total proposals", proposals)
    updatedProposals = []

    setPrevEnd(nextEnd - 3)
    setPrevStart(nextStart - 3)
    if (btnPrev != null) {
      btnPrev.disabled = false
    }
    for (let i = nextStart; i < nextEnd; i++) {
      console.log("i", i)

      if (nextEnd == proposals?.length && btnNext !== null) {

        btnNext.disabled = true
      }

      if (proposals && i < proposals.length) {
        updatedProposals.push(proposals[i])
      }

    }
    setfilteredProposals(updatedProposals)
    setNextStart(nextEnd)
    console.log("Next Start Proposals", nextStart)

    setToalProposalsCount(nextEnd + nextOffset)
    console.log("Prosals real length", proposals?.length)
    console.log("Total proposals Count", totalProposalsCount)
    if (proposals && totalProposalsCount >= proposals?.length && btnNext !== null) {
      btnNext.disabled = true
    }

  }

  const paginationNextIdea = () => {
  
    setNextEndIdea(nextOffset + nextEndIdea)
    updatedIdeas = []

    setPrevEndIdea(nextEndIdea - 3)
    setPrevStartIdea(nextStartIdea - 3)
    if (btnPrevIdea != null) {
      btnPrevIdea.disabled = false
    }
    for (let i = nextStartIdea; i < nextEndIdea; i++) {
      console.log("i", i)

      if (nextEndIdea == proposals?.length && btnNextIdea !== null) {

        btnNextIdea.disabled = true
      }

      if (ideas && i < ideas.length) {
        updatedIdeas.push(ideas[i])
      }

    }
   
    setfilteredIdeas(updatedIdeas)
    setNextStartIdea(nextEndIdea)

    setToalIdeasCount(nextEndIdea + nextOffset)
    console.log("Total ideas Count", totalIdeasCount)
    if (ideas && totalIdeasCount >= ideas?.length && btnNextIdea !== null) {
      btnNextIdea.disabled = true
    }

  }

  const paginationPrevious = () => {

    setToalProposalsCount(totalProposalsCount - nextOffset)
    updatedProposals = []
    for (let i = preStart; i < prevEnd; i++) {
      console.log("i", i)
      const btn = document.getElementById('btnNext') as HTMLButtonElement | null;

      if (nextEnd !== proposals?.length && btn !== null) {

        btn.disabled = false
      }
      if (proposals) {

        updatedProposals.push(proposals[i])
      }

    }
    console.log("update", updatedProposals)
    setfilteredProposals(updatedProposals)
    setNextStart(preStart + 3)
    setNextEnd(prevEnd + 3)
    setPrevStart(preStart - 3)
    setPrevEnd(prevEnd - 3)
  }
  const paginationPrevIdea = () => {
    console.log("clicked")
    setToalProposalsCount(totalProposalsCount - nextOffset)
    updatedIdeas = []

    for (let i = preStartIdea; i < prevEndIdea; i++) {
      console.log("i", i)
      const btn = document.getElementById('btnNextIdea') as HTMLButtonElement | null;

      if (nextEndIdea !== ideas?.length && btn !== null) {

        btn.disabled = false
      }
      if (ideas) {

        updatedIdeas.push(ideas[i])
      }

    }

    setfilteredIdeas(updatedIdeas)
    setNextStartIdea(preStartIdea + 3)
    setNextEndIdea(prevEndIdea + 3)
    setPrevStartIdea(preStartIdea - 3)
    setPrevEndIdea(prevEndIdea - 3)
  }
  return (
    <Container className="conversations-page-content">
      <h3 style={{ paddingTop: "1rem" }}>Proposals</h3>
      <hr />
      <Row>
        {filteredProposals
          ? filteredProposals.map((proposal) => (
            <Col
              key={proposal.id}
              md={6}
              lg={4}
              className="pt-3 align-items-stretch"
            >
              <ProposalTile
                proposalData={proposal}
                showFooter={true}
                postType={"Proposal"}
              />
            </Col>
          ))
          : [...Array(3)].map((x, i) => (
            <Col key={i} md={6} lg={4} className="pt-3 align-items-stretch">
              <PlaceholderIdeaTile />
            </Col>
          ))}
      </Row>
      <div className="d-flex justify-content-center">
        <div className="my-3">
          <Button onClick={paginationPrevious} id="btnPrev">Previous page</Button>
        </div>
        <div className="my-3">
          <Button onClick={paginationNext} id="btnNext">Next page</Button>
        </div>

      </div>
      <h3 style={{ marginTop: "1rem" }}>Ideas</h3>
      <hr style={{ paddingBottom: "0rem", marginBottom: "0rem" }} />
      <Row>
        {ideas
          ? filteredIdeas.map((idea) => (
            <Col key={idea.id} className="col-card" xs={12} md={6} lg={4}>
              <IdeaTile ideaData={idea} showFooter={true} postType={"Idea"} />
            </Col>
          ))
          : [...Array(3)].map((x, i) => (
            <Col key={i} md={6} lg={4} className="pt-3 align-items-stretch">
              <PlaceholderIdeaTile />
            </Col>
          ))}
      </Row>
      <div className="d-flex justify-content-center">
        <div className="my-3">
          <Button onClick={paginationPrevIdea} id="btnPrevIdea">Previous page</Button>
        </div>
        <div className="my-3">
          <Button onClick={paginationNextIdea} id="btnNextIdea">Next page</Button>
        </div>

      </div>
    </Container>
  );
};

export default ConversationsPageContent;
