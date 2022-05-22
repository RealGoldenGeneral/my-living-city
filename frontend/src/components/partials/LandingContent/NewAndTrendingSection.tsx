import { Container, Row, Col, Carousel, Modal, Collapse } from "react-bootstrap";
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
import { useAllSuperSegments, useAllSegments } from "./../../../hooks/segmentHooks";


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
    impactArea: [],
    superSeg: [],
    seg: [],
  });
  const [isCategoriesOpen, setCategoriesOpen] = useState<any>(true);
  const [isImpactOpen, setImpactOpen] = useState<any>(false);
  const [isSuperSegOpen, setSuperSegOpen] = useState<any>(false);
  const [isSegOpen, setSegOpen] = useState<any>(false);

  const handleModalCancel = () => {setShowModal(false)};
  const { data: categories, isLoading, error, isError } = useCategories();
  const { data: allSegments } = useAllSegments();
  const { data: allSuperSegments } = useAllSuperSegments();

  const handleCategory = (e: any, value: any) => {
    let configCopy = filterConfig;
    if (e.target.checked) {
      if (!configCopy.category.includes(value)) {configCopy.category = [...configCopy.category, value]}
    } else {
      if (configCopy.category.includes(value)) {
        const indexOfValue = configCopy.category.indexOf(value);
        if (indexOfValue > -1) {configCopy.category.splice(indexOfValue, 1)}
      }
    }
    setFilterConfig(configCopy);
  }

  const handleImpactArea = (e: any, value: any) => {
    let configCopy = filterConfig;
    if (e.target.checked) {
      if (!configCopy.impactArea.includes(value)) {configCopy.impactArea = [...configCopy.impactArea, value]}
    } else {
      if (configCopy.impactArea.includes(value)) {
        const indexOfValue = configCopy.impactArea.indexOf(value);
        if (indexOfValue > -1) {configCopy.impactArea.splice(indexOfValue, 1)}
      }
    }
    setFilterConfig(configCopy);
  }

  const handleSuperSeg = (e: any, value: any) => {
    let configCopy = filterConfig;
    if (e.target.checked) {
      if (!configCopy.superSeg.includes(value)) {configCopy.superSeg = [...configCopy.superSeg, value]}
    } else {
      if (configCopy.superSeg.includes(value)) {
        const indexOfValue = configCopy.superSeg.indexOf(value);
        if (indexOfValue > -1) {configCopy.superSeg.splice(indexOfValue, 1)}
      }
    }
    setFilterConfig(configCopy);
  }

  const handleSeg = (e: any, value: any) => {
    let configCopy = filterConfig;
    if (e.target.checked) {
      if (!configCopy.seg.includes(value)) {configCopy.seg = [...configCopy.seg, value]}
    } else {
      if (configCopy.seg.includes(value)) {
        const indexOfValue = configCopy.seg.indexOf(value);
        if (indexOfValue > -1) {configCopy.seg.splice(indexOfValue, 1)}
      }
    }
    setFilterConfig(configCopy);
  }

  const doesIdeaPassFilter = (idea: IIdeaWithAggregations): boolean => {
    if (filterConfig.category.length !== 0 && !filterConfig.category.includes(idea.categoryId)) {
      return false;
    } 
    if (filterConfig.impactArea.length !== 0) {
      let doesIdeaPassImpact = true;
      filterConfig.impactArea.forEach((impactArea: string) => {
        if (!idea[impactArea as keyof IIdeaWithAggregations]) {
          doesIdeaPassImpact = false;
        }
      });
      if (!doesIdeaPassImpact) {return false};
    }
    if (filterConfig.superSeg.length !== 0 && !filterConfig.superSeg.includes(idea.superSegId)) {
      return false;
    }
    if (filterConfig.seg.length !== 0 && !filterConfig.seg.includes(idea.segId)) {
      return false;
    }
    return true;
  }

  const titleStyle: CSS.Properties = {
    display: "inline",
  }
  
  const filterButtonStyle: CSS.Properties = {
    float: "right"
  }

  const mouseHoverPointer = (e: any) => {
    e.target.style.cursor = "pointer"
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
        <div className="pb-1 border-bottom display-6 text-center">
          <h2 style={titleStyle}>New and Trending</h2>
          <Button style={filterButtonStyle} onClick={() => {setShowModal(!showModal)}}><BsFilter size={20} /></Button>
        </div>
      )}

      <Carousel controls={true} interval={null} slide={false} fade={false}>
        {[...Array(4)].map((x, i) => (
          <Carousel.Item key={i}>
            {topIdeas
              ? topIdeas.slice(i * 3, i * 3 + 3).map((idea) => {
                return doesIdeaPassFilter(idea) ? 
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
                      postType="Idea"
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
      </Carousel>

      <Modal show={showModal} onHide={handleModalCancel} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Customize New and Trending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 onClick={() => {setCategoriesOpen(!isCategoriesOpen)}} onMouseOver={mouseHoverPointer}>Categories</h5>
          <hr />
          <Collapse in={isCategoriesOpen}>
            <div>
            {categories &&
              categories.map((category, i) => {
                return (
                  <div key={i}>
                    <input defaultChecked={filterConfig.category.includes(category.id)} 
                      type="checkbox"
                      id={category.title} 
                      name={category.title} 
                      value={category.id} 
                      onClick={(e) => handleCategory(e, category.id)}/>
                    <label htmlFor={category.title}>{capitalizeFirstLetterEachWord(category.title)}</label>
                  </div>
                )
              })
            }
            </div>
          </Collapse>
           <br />
          <h5 onClick={() => {setImpactOpen(!isImpactOpen)}} onMouseOver={mouseHoverPointer}>Impact Areas</h5>
          <hr />
          <Collapse in={isImpactOpen}>
              <div>
                <div>
                  <input defaultChecked={filterConfig.impactArea.includes("communityImpact")} type="checkbox" id="communityAndPlace" name="communityAndPlace" value="communityImpact" onClick={(e) => handleImpactArea(e, "communityImpact")}/>
                  <label htmlFor="communityAndPlace">Community and Place</label>
                </div>
                <div>
                  <input defaultChecked={filterConfig.impactArea.includes("natureImpact")} type="checkbox" id="natureAndFoodSecurity" name="natureAndFoodSecurity" value="natureImpact" onClick={(e) => handleImpactArea(e, "natureImpact")}/>
                  <label htmlFor="natureAndFoodSecurity">Nature and Food Security</label>
                </div>
                <div>
                  <input defaultChecked={filterConfig.impactArea.includes("artsImpact")} type="checkbox" id="artsCultureAndEducation" name="artsCultureAndEducation" value="artsImpact" onClick={(e) => handleImpactArea(e, "artsImpact")}/>
                  <label htmlFor="artsCultureAndEducation">Arts, Culture, and Education</label>
                </div>
                <div>
                  <input defaultChecked={filterConfig.impactArea.includes("energyImpact")} type="checkbox" id="waterAndEnergy" name="waterAndEnergy" value="energyImpact" onClick={(e) => handleImpactArea(e, "energyImpact")}/>
                  <label htmlFor="waterAndEnergy">Water and Energy</label>
                </div>
                <div>
                  <input defaultChecked={filterConfig.impactArea.includes("manufacturingImpact")} type="checkbox" id="manufacturingAndWaste" name="manufacturingAndWaste" value="manufacturingImpact" onClick={(e) => handleImpactArea(e, "manufacturingImpact")}/>
                  <label htmlFor="manufacturingAndWaste">Manufacturing and Waste</label>
                </div>
              </div>
            </Collapse>
            <br />

            <h5 onClick={() => {setSuperSegOpen(!isSuperSegOpen)}} onMouseOver={mouseHoverPointer}>SuperSegment</h5>
            <hr />
            <Collapse in={isSuperSegOpen}>
            <div>
            {allSuperSegments &&
              allSuperSegments.map((superSeg, i) => {
                return (
                  <div key={i}>
                    <input defaultChecked={filterConfig.superSeg.includes(superSeg.superSegId)}
                      type="checkbox"
                      id={superSeg.name} 
                      name={superSeg.name}
                      value={superSeg.superSegId} 
                      onClick={(e) => {handleSuperSeg(e, superSeg.superSegId)}}
                      />
                    <label htmlFor={superSeg.name}>{capitalizeFirstLetterEachWord(superSeg.name)}</label>
                  </div>
                )
              })
            }
            </div>
          </Collapse>
          <br />
            <h5 onClick={() => {setSegOpen(!isSegOpen)}} onMouseOver={mouseHoverPointer}>Segment</h5>
            <hr />
            <Collapse in={isSegOpen}>
            <div>
            {allSegments &&
              allSegments.map((seg, i) => {
                return (
                  <div key={i}>
                    <input type="checkbox" 
                      defaultChecked={filterConfig.seg.includes(seg.segId)}
                      id={seg.name}
                      name={seg.name}
                      value={seg.segId} 
                      onClick={e => handleSeg(e, seg.segId)}/>
                    <label htmlFor={seg.name}>{capitalizeFirstLetterEachWord(seg.name)}</label>
                  </div>
                )
              })
            }
            </div>
          </Collapse>
          <br />

        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default NewAndTrendingSection;
