import { Col, Container, Image, Row, Popover, OverlayTrigger} from 'react-bootstrap'
const CONTENT = {
  community: {
    subHeader: "How do we build community to a human scale, allowing equity, inclusivity, and peace?",
    body: 
    `- Having a good mix of private and public spaces\n
    - Open spaces for people to meet and play\n
    - Designing neighborhoods that work for community\n
    - Walkable neighborhoods where you can live, work and play within manageable walking distances\n
    - Creating inclusive and accessible communities for everyone\n
    - Creating opportunities for equality`
  }
}
interface ToastieProps {
  header: string;
  subHeader: string;
  body: string;
  img: string;
}
export const Toastie: React.FC<ToastieProps> = ({header, subHeader, body, img}) => {
  let arr = body.split("\r\n");
  return(
    <OverlayTrigger
      trigger="click"
      key={header}
      overlay={
        <Popover id={`popover-positioned-top`}>
          <Popover.Title as="h3">{header}</Popover.Title>
          <Popover.Content>
            <strong>{subHeader}</strong><br/>
            {arr.map((line)=><><p key={line}>{line}</p><br/></>)}
          </Popover.Content>
        </Popover>
      }
    >
      <Image className='d-block mx-auto' width='70%' src={img} />
    </OverlayTrigger>
    )
}
interface CategoriesSectionProps{}
const CategoriesSection = (props: CategoriesSectionProps) => {

  return (
    <Container className="py-5">
      <h2 className="pb-1 border-bottom display-6 text-center">Impact Areas</h2>
      <Row className='justify-content-center g-5 pt-4'>
        <Col xs={6} sm={4} lg={2}>
        <a href="javascript:void(0)"><Toastie header="Nature and Food Security" subHeader={CONTENT.community.subHeader} body={CONTENT.community.body} img="/categories/MLC-Icons-Green-01.png"/></a>
          {/* <a href="javascript:void(0)"><Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-01.png' /></a> */}
          <p className='text-center py-3'>Nature and Food Security</p>
        </Col>
        <Col xs={6} sm={4} lg={2}>
        <a href="javascript:void(0)"><Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-02.png' /></a>
          <p className='text-center py-3'>Water & Energy</p>
        </Col>
        <Col xs={6} sm={4} lg={2}>
        <a href="javascript:void(0)"><Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-03.png' /></a>
          <p className='text-center py-3'>Manufacturing & Waste</p>
        </Col>
        <Col xs={6} sm={4} lg={2}>
        <a href="javascript:void(0)"><Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-04.png' /></a>
          <p className='text-center py-3'>Arts, Culture & Education</p>
        </Col>
        <Col xs={6} sm={4} lg={2}>
        <a href="javascript:void(0)"><Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-05.png' /></a>
          <p className='text-center py-3'>Community & Place</p>
        </Col>
      </Row>
    </Container>
  )
}

export default CategoriesSection