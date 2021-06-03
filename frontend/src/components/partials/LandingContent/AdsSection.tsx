import { Col, Container, Image, Row, Carousel } from 'react-bootstrap';
// import { Slider } from 'infinite-react-carousel';
import React from 'react';
import { useState, useEffect } from 'react';
import { IAdvertisement } from '../../../lib/types/data/advertisement.type';


//http://madmartech.com/wp-content/uploads/2019/05/970x250-1.png
//https://www.frontiersin.org/files/Articles/70413/fpsyg-05-00166-HTML/image_m/fpsyg-05-00166-g006.jpg
interface AdsSectionProps {
    // AllAdvertisement: IAdvertisement
}

const AdsSection: React.FC<AdsSectionProps> = () => {
    // const {
    //     externalLink,
    //     imagePath,
    // } = basicAdvertisement;

    return (
        <Container>
            {/* <h2 className="pb-1 border-bottom display-6 text-center">Our Locals</h2> */}

            <Carousel indicators={false} pause={'hover'}>
                {/* {basicAdvertisement.map(item => (
                    <Carousel.Item interval={10000}>
                        <a href={item.externalLink}>
                            <img
                            className="d-block w-100"
                            src={item.imagePath}
                            />
                        </a>
                    </Carousel.Item>
                ))} */}


                <Carousel.Item interval={5000}>
                    <a href="http://www.google.ca">
                        <img
                        className="d-block w-100"
                        src='http://madmartech.com/wp-content/uploads/2019/05/970x250-1.png'
                        />
                    </a>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <a href='https://99designs.ca/blog/marketing-advertising/14-design-tips-for-more-clickable-banner-ads/'>
                        <img
                        className="d-block w-100"
                        src="https://www.frontiersin.org/files/Articles/70413/fpsyg-05-00166-HTML/image_m/fpsyg-05-00166-g006.jpg"
                        />
                    </a>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

export default AdsSection;