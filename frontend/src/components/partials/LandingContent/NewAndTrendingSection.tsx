import { Container, Row, Col, Carousel, Modal } from "react-bootstrap";
import PlaceholderIdeaTile from "src/components/tiles/PlaceholderIdeaTile";
import { IIdeaWithAggregations } from "../../../lib/types/data/idea.type";
import IdeaTile from "../../tiles/IdeaTile";
import {BsFilter} from "react-icons/bs";
import CSS from "csstype";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ICategory } from "src/lib/types/data/category.type";
import { useCategories} from "src/hooks/categoryHooks";
import { capitalizeFirstLetterEachWord } from "./../../../lib/utilityFunctions";



interface NewAndTrendingProps {
  topIdeas: IIdeaWithAggregations[];
  postType?: string;
  isDashboard?: boolean;
}

const NewAndTrendingSection: React.FC<NewAndTrendingProps> = ({
  topIdeas,
  postType,
  isDashboard,
}) => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterConfig, setFilterConfig] = useState<any>({
    category: [],
    community: [],
    impactArea: [],
  });


  const handleModalCancel = () => {setShowModal(false)};
  const handleModalSave = () => {setShowModal(false)};
  const { data: categories, isLoading, error, isError } = useCategories();

  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  const titleStyle: CSS.Properties = {
    display: "inline",
  }
  
  const filterButtonStyle: CSS.Properties = {
    float: "right"
  }

  return (
    <Container className="system" id="hanging-icons">
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
        }
        .container {
          padding-left: 0;
          padding-right: 0;
        }
        .carousel-indicators {
          display: none;
        `}
      </style>

      {isDashboard ? (
        <div className="pb-1 border-bottom display-6">
          <h2 style={titleStyle}>New and Trending</h2>
          <Button style={filterButtonStyle} onClick={() => {setShowModal(!showModal)}}><BsFilter size={20} /></Button>
        </div>
      ) : (
        <h2 className="pb-1 border-bottom display-6 text-center">
          New and Trending
        </h2>
      )}

      <Carousel controls={true} interval={null}>
        {[...Array(4)].map((x, i) => (
          <Carousel.Item key={i}>
            {topIdeas
              ? topIdeas.slice(i * 3, i * 3 + 3).map((idea) => (
                  <Col
                    key={idea.id}
                    md={6}
                    lg={4}
                    className="pt-3 align-items-stretch"
                  >
                    <IdeaTile
                      ideaData={idea}
                      showFooter={true}
                      postType="Idea"
                    />
                  </Col>
                ))
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
      </Carousel>
      <Row className="g-5 py-3 justify-content-center">
        {/* <a className='pt-5 text-align-center' href="/ideas">
          <h5>View all ideas and conversations</h5>
        </a> */}
      </Row>
      <Modal show={showModal} onHide={handleModalCancel} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Customize New and Trending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <input type="checkbox" id="test" name="test" value="test" />
          <label htmlFor="test">Test</label> */}
          <h5>Categories</h5>
          <hr />
          {categories &&
            categories.map((category) => {
              return (
                <div>
                  <input type="checkbox" id={category.title} name={category.title} value={category.id} />
                  <label htmlFor={category.title}>{capitalizeFirstLetterEachWord(category.title)}</label>
                </div>
              )
            })
          } <br />
          <h5>Impact Areas</h5>
          <hr />
            <div>
              <input type="checkbox" id="communityAndPlace" name="communityAndPlace" value="community_impact" />
              <label htmlFor="communityAndPlace">Community and Place</label>
            </div>
            <div>
              <input type="checkbox" id="natureAndFoodSecurity" name="natureAndFoodSecurity" value="nature_impact" />
              <label htmlFor="natureAndFoodSecurity">Nature and Food Security</label>
            </div>
            <div>
              <input type="checkbox" id="artsCultureAndEducation" name="artsCultureAndEducation" value="arts_impact" />
              <label htmlFor="artsCultureAndEducation">Arts, Culture, and Education</label>
            </div>
            <div>
              <input type="checkbox" id="waterAndEnergy" name="waterAndEnergy" value="energy_impact" />
              <label htmlFor="waterAndEnergy">Water and Energy</label>
            </div>
            <div>
              <input type="checkbox" id="manufacturingAndWaste" name="manufacturingAndWaste" value="manufacturing_impact" />
              <label htmlFor="manufacturingAndWaste">Manufacturing and Waste</label>
            </div>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewAndTrendingSection;
