import React from 'react'
import { Col, Container, Row, Table} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { IAdvertisement } from 'src/lib/types/data/advertisement.type';


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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ads ID</th>
              <th>Owner ID</th>
              <th>Ads Images</th>
              <th>Ads Type</th>
              <th>Ads Title</th>
              <th>Ads Duration</th>
              <th>Ads Position</th>
              <th>Ads Link</th>
              <th>Publish Status</th>
              <th>Create Date</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {AllAdvertisement?.map(item => (
              <tr key={item.id}>
              <td>{item.adTitle}</td>
              <td>{item.ownerId}</td>
              <td>{item.imagePath}</td>
              <td>{item.adType}</td>
              <td>{item.adTitle}</td>
              <td>{item.duration}</td>
              <td>{item.adPosition}</td>
              <td>{item.externalLink}</td>
              <td>{item.published}</td>
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