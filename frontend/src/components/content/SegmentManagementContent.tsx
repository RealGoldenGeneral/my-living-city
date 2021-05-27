import React from 'react'
import {Table, Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import { useContext, useState } from 'react'
import {ISegment, ISubSegment} from '../../lib/types/data/segment.type';
import { capitalizeString } from '../../lib/utilityFunctions';
import {updateSegment} from '../../lib/api/segmentRoutes';
import {getAllSubSegmentsWithId} from '../../lib/api/segmentRoutes';
const SelectRegion:React.FC = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => {setShow(true);}
    const handleClose = () => {setShow(false);}
    return(
        <>
        <Button onClick={()=>{handleShow()}}>Create Segment</Button>
        {
            show ? <Card>
            <Card.Body>
                
                <Form>
                    <Form.Group controlId="loginEmail" className="mt-2">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        name='email'
                        type='email'
                        required
                        placeholder='Enter email'
                    />
                    </Form.Group>
                    <Button type={"submit"} variant="primary" onClick={()=>{handleClose()}}>
                    Create
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        :<div></div>
        }
        </>
    )
}

interface SegmentPageContentProps {
  segments: ISegment[] | undefined;
  token: any;
}
const SegmentManagementContent: React.FC<SegmentPageContentProps> = ({segments, token}) => {
  console.log(segments);
  console.log(segments?.[0].name)
  const [showSub, setShowSub] = useState(false);
  const [showSeg, setShowSeg] = useState(false);
  let subArr: any | undefined;
  async function handleView(segId: string, token: string){
    return await getAllSubSegmentsWithId(segId,token);
  }
  //let subArr:Promise<ISubSegment[]>;
  return (
    <Container className='conversations-page-content'>
      <h2>Segmentation Manager</h2>
      <Row className='justify-content-center mt-3'>
      <Form.Group>
      <Card>
        <Card.Header>Enter a location to manage</Card.Header>
        <Card.Body>
          <Form.Label>Country</Form.Label>
            <Form.Control size="sm" as="select">
              <option>Canada</option>
              </Form.Control>
            <br />
          <Form.Label>Province</Form.Label>
            <Form.Control size="sm" as="select">
              <option>Alberta</option><option>British Columbia</option><option>Manitoba</option>
                <option>New Brunswick</option><option>Newfoundland and Labrador</option><option>Northwest Territories</option>
              <option>Nova Scotia</option><option>Nunavut</option><option>Ontario</option><option>Prince Edward Island</option>
            <option>Quebec</option><option>Saskatchewan</option><option>Yukon</option>
          </Form.Control>
        </Card.Body>
        <Card.Footer><Button onClick={()=>setShowSeg(true)}>Submit</Button></Card.Footer>
      </Card>
      </Form.Group>
      <Col>
      {showSeg ?
      <Card>
      <Card.Header>Segments</Card.Header>
        <Card.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Seg ID</th>
                <th>Name</th>
                <th>Super Seg-Name</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              
              {segments?.map(segment => (
              <tr>
                <td><Form.Control type="text" value={String(segment.segId)} readOnly/></td>
                <td><Form.Control 
                  type="text" 
                  defaultValue={capitalizeString(segment.name)}
                  onChange={(e)=>{segment.name = e.target.value}}
                  /></td>
                <td><Form.Control 
                  type="text" defaultValue={segment.superSegName ? capitalizeString(segment.superSegName) : "Unknown" }
                  onChange={(e)=>{segment.superSegName = e.target.value}}
                  /></td>
                <td>
                  <Button onClick={()=>{
                    setShowSub(true);
                    subArr = handleView(String(segment.segId), token)
                    }} size="sm">View</Button>{' '}
                  <Button onClick={()=>updateSegment({name:segment.name,superSegName:segment.superSegName, segId:segment.segId}, token)}size="sm">Update</Button>{' '}
                </td>
              </tr>))}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer><Button>Add New Segment</Button></Card.Footer>
      </Card>
      
      : <div/>
      }
      <br/>
      {showSub?
      <Card>
      <Card.Header>Sub-Segments</Card.Header>
      <Card.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Seg ID</th>
                <th>Name</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              
              {subArr && subArr?.map((segment: ISubSegment) => (
              <tr>
                <td><Form.Control type="text" value={String(segment.segId)} readOnly/></td>
                <td><Form.Control 
                  type="text" 
                  defaultValue={capitalizeString(segment.name)}
                  onChange={(e)=>{segment.name = e.target.value}}
                  /></td>
                <td>
                  <Button onClick={()=>updateSegment({name:segment.name, segId:segment.segId}, token)}size="sm">Update</Button>{' '}
                  {/* <Button variant="warning" size="sm">Delete</Button> */}
                </td>
              </tr>))}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer><Button>Add New Sub-Segments</Button></Card.Footer>
      </Card>
      :<div/>
    }
      </Col>
      </Row>
    </Container>
  );
}

export default SegmentManagementContent;