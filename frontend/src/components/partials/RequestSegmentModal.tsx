import React, { useState } from 'react'
import {Modal, Form, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
interface RequestSegmentModalProps {
    showModal: boolean;
    setShowModal: any;
    index: number;
    setSegmentRequests: any;
    segmentRequests: any;
}
interface IRequestSegment {
    country: string;
    province: string;
    segmentName: string;
    subSegmentName: string;
}
export const RequestSegmentModal: React.FC<RequestSegmentModalProps> = ({showModal, setShowModal, index, setSegmentRequests, segmentRequests}) => {
    const refactorSegRequests = (index: number, segDetails: any) => {
        let segDetailsArray = [...segmentRequests];
        segDetailsArray[index] = segDetails;
        setSegmentRequests(segDetailsArray);
    }
    console.log(segmentRequests);
    function submitHandler(values: IRequestSegment){
        //console.log(values);
        refactorSegRequests(index, values);
        setShowModal(false);
    }
    const formik = useFormik<IRequestSegment>({
        initialValues: {
            country: '',
            province: '',
            segmentName: '',
            subSegmentName: '',
        },
        
        onSubmit: submitHandler
    })
        return (
            <Modal show={showModal} onHide={()=>{setShowModal(false)}} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Request your community!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter country" value={formik.values.country} onChange={formik.handleChange}/>
                </Form.Group>
                <Form.Group controlId="province">
                    <Form.Label>Province/State</Form.Label>
                    <Form.Control type="text" placeholder="Enter province" value={formik.values.province} onChange={formik.handleChange}/>
                </Form.Group>
                <Form.Group controlId="segmentName">
                    <Form.Label>Municipality or place name</Form.Label>
                    <Form.Control type="text" placeholder="Enter municipality" value={formik.values.segmentName} onChange={formik.handleChange}/>
                </Form.Group>
                <Form.Group controlId="subSegmentName">
                    <Form.Label>Neighbourhood</Form.Label>
                    <Form.Control type="text" placeholder="Enter neighbourhood" value={formik.values.subSegmentName} onChange={formik.handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                </Form>
                </Modal.Body>
            </Modal>
        );
}