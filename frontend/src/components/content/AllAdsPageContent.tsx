import React from 'react'
import { Col, Container, Row, Table, Image, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { IAdvertisement } from 'src/lib/types/data/advertisement.type';
import moment from 'moment';

// import '../../../../server/uploads'
import '../../scss/content/_allAds.scss'

interface AllAdsPageContentProps {
  AllAdvertisement: IAdvertisement[] | undefined
}

const AllAdsPageContent: React.FC<AllAdsPageContentProps> = ({ AllAdvertisement }) => {
  // console.log(AllAdvertisement);

  return (
    
    <Container className='all-ads-page-content w-100'>
      <Row className='justify-content-center'>
      <h1 className="pb-1 border-bottom display-6 text-center">All Advertisements</h1>
      </Row>

      <Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Actions</th>
              <th>Title</th>
              <th>Type</th>
              <th>Owner ID</th>
              <th>Images</th>
              <th>Expiration</th>
              <th>Position</th>
              <th>Link</th>
              <th>Publish Status</th>
              <th>Create Date</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {AllAdvertisement?.map(item => (
              <tr key={item.id}>
                <td><Button block variant="primary">Edit</Button> <Button block variant="danger">Delete</Button></td>
                <td>{item.adTitle}</td>
                <td>{item.adType}</td>
                <td>{item.ownerId}</td>
                <td>{item.imagePath.substring(8)}</td>
                <td>{moment(item.duration).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>{item.adPosition}</td>
                <td><a href={item.externalLink}>{item.externalLink}</a></td>
                <td>{item.published.toString()}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      
      
    </Container>
  );
}

export default AllAdsPageContent