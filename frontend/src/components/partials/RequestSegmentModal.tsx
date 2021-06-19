import React, { useState } from 'react'
import {Modal, Form, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
interface RequestSegmentModalProps {
    showModal: boolean;
}
interface IRequestSegment {
    userId: string;
    country: string;
    province: string;
    segment: string;
    subSegment: string;
}
export const RequestSegmentModal: React.FC<RequestSegmentModalProps> = ({showModal}) => {
    const [show, setShow] = useState(showModal);
    function submitHandler(){

    }
    const formik = useFormik<IRequestSegment>({
        initialValues: {
            userId: '',
            country: '',
            province: '',
            segment: '',
            subSegment: '',
        },
        
        onSubmit: submitHandler
    })
        return (
            <Modal show={show} onHide={()=>{setShow(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Request your community!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter country" />
                    <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Form.Group controlId="province">
                    <Form.Label>Province/State</Form.Label>
                    <Form.Control type="text" placeholder="Enter province" />
                </Form.Group>
                <Form.Group controlId="segment">
                    <Form.Label>Municipality or place name</Form.Label>
                    <Form.Control type="text" placeholder="Enter municipality" />
                </Form.Group>
                <Form.Group controlId="subSegment">
                    <Form.Label>Neighbourhood</Form.Label>
                    <Form.Control type="text" placeholder="Enter neighbourhood" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                </Form>
                </Modal.Body>
            </Modal>
        );
}