import React, { useState } from 'react'
import { Button, Container, Form, Modal, Row } from 'react-bootstrap';
import { IUser } from 'src/lib/types/data/user.type';
import { useFormik } from "formik";
import { IBanUserInput } from 'src/lib/types/input/banUser.input';
import { postCreateBan } from 'src/lib/api/banRoutes';
import { updateUser } from 'src/lib/api/userRoutes';

interface BanModalProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
    modalUser: IUser;
    currentUser: IUser;
    token: string | null
};

interface FeedbackModalProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
    message: string;
}

const WARNING_MESSAGE_DURATION = 30;

export const UserManagementBanModal = ({
    setShow,
    show,
    modalUser,
    currentUser,
    token
}: BanModalProps) => {
    const handleClose = () => setShow(false);
    const submitHandler = async (values: IBanUserInput) => {
        try {
            modalUser.banned = true;
            // Check if ban is a Warning
            if (values.banUntil === 0) {
                values.banUntil = WARNING_MESSAGE_DURATION;
                values.isWarning = true;
                modalUser.banned = false;
            }
            // POST to database
            const banInputValues: IBanUserInput = {
                userId: values.userId,
                banUntil: values.banUntil,
                banReason: values.banReason,
                banMessage: values.banMessage,
                isWarning: values.isWarning
            }
            await postCreateBan(banInputValues, token);
            await updateUser(modalUser, token, currentUser);
            handleClose();
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik<IBanUserInput>({
        initialValues: {
            userId: modalUser.id,
            banUntil: 0,
            banReason: "",
            banMessage: "",
            isWarning: false
        },
        onSubmit: submitHandler
    });

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static" // Disallow clicking outside of modal to close modal
                centered
                size='lg'
                keyboard={false} // Disallow esc key to close modal
            >
                <Modal.Header closeButton>
                    <Container>
                        <Row className='justify-content-center'>
                            <Modal.Title>Ban User: {modalUser.email}</Modal.Title>
                        </Row>
                        <Row className='text-center'>
                        </Row>
                    </Container>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Label>
                            Ban Duration
                        </Form.Label>
                        <Form.Control
                            as="select"
                            name="banUntil"
                            onChange={formik.handleChange}
                            value={formik.values.banUntil}
                        >
                            <option value={0}>Warning Message (30 Days)</option>
                            <option value={30}>30 Days</option>
                            <option value={60}>60 Days</option>
                            <option value={90}>3 Months</option>
                            <option value={180}>6 Months</option>
                            <option value={365}>1 Year</option>
                            <option value={99999}>Indefinitely</option>
                        </Form.Control>
                        <br />
                        <Form.Label>
                            Ban Reason
                        </Form.Label>
                        <Form.Control
                            as="select"
                            name="banReason"
                            onChange={formik.handleChange}
                            value={formik.values.banReason}
                            required
                        >
                            <option selected disabled value=''>Select Ban Reason...</option>
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
                            name="banMessage"
                            placeholder="Additional Details for Ban"
                            onChange={formik.handleChange}
                            value={formik.values.banMessage}
                            required
                        />
                    </Modal.Body>
                    <Modal.Footer className='d-flex flex-column'>
                        <div className='w-100 d-flex justify-content-end'>
                            <Button
                                className='mr-3'
                                type='submit'
                            >Ban
                            </Button>
                            <Button
                                className='mr-3'
                                variant="secondary"
                                onClick={handleClose}
                            >Cancel
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
