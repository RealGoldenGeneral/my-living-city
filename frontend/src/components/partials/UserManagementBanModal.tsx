import React, { useState } from 'react'
import { Button, Card, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { IUser } from 'src/lib/types/data/user.type';

interface BanModalProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
    user: IUser | null;
}

export const UserManagementBanModal = ({
    setShow,
    show,
    user
}: BanModalProps) => {
    const handleClose = () => setShow(false);
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size='lg'
            animation={false}
        >
            <Modal.Header closeButton>
                <Container>
                    <Row className='justify-content-center'>
                        <Modal.Title>Ban User</Modal.Title>
                    </Row>
                    <Row className='text-center'>
                    </Row>
                </Container>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>
                        Ban Duration
                    </Form.Label>
                    <Form.Control as="select">
                        <option>Warning Message Only</option>
                        <option>30 Days</option>
                        <option>60 Days</option>
                        <option>3 Months</option>
                        <option>6 Months</option>
                        <option>1 Year</option>
                        <option>Indefinitely</option>
                    </Form.Control>
                    <br />
                    <Form.Label>
                        Ban Reason
                    </Form.Label>
                    <Form.Control
                        as="select"
                        required
                    >
                        <option>Abuse of flagging privileges</option>
                        <option>Posting abuse or non-conforming content</option>
                        <option>Breach of user agreement</option>
                        <option>Other</option>
                    </Form.Control>
                    <br />
                    <Form.Label>Ban Additional Details</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Additional Details for Ban"
                        required
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex flex-column'>
                <div className='w-100 d-flex justify-content-end'>
                    <Button
                        className='mr-3'
                        // Write to Database
                        onClick={handleClose}
                    >Submit
                    </Button>
                    <Button
                        className='mr-3'
                        variant="secondary"
                        onClick={handleClose}
                    >Close
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}