import React, { useState } from 'react'
import { Button, Container, Card, Modal, Row } from 'react-bootstrap';
import { IUser } from 'src/lib/types/data/user.type';
import { FindBanDetails } from 'src/hooks/banHooks';
import { IBanUserInput } from 'src/lib/types/input/banUser.input';
import { deleteBan } from 'src/lib/api/banRoutes';
import { updateUser } from 'src/lib/api/userRoutes';

interface UnbanModalProps {
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

export const UserManagementUnbanModal = ({
    setShow,
    show,
    modalUser,
    currentUser,
    token
}: UnbanModalProps) => {
    const { data: modalUserData, error, isLoading, isError } = FindBanDetails(modalUser.id);
    const handleClose = () => setShow(false);
    const unbanUser = async () => {
        try {
            modalUser.banned = false;
            await deleteBan(modalUser.id, token)
            await updateUser(modalUser, token, currentUser);
            handleClose();
        } catch (error) {
            console.log(error)
        }
    }

    if (isError) {
        console.log(error);
        return (
            <div className="wrapper">
                <p>
                    Error occured while trying to retrieve warning details. Please try again later.
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <Modal
                show={show}
                size="lg"
                centered>
            </Modal>
        );
    }

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
                            <Modal.Title>Unban User: {modalUser.email}</Modal.Title>
                        </Row>
                        <Row className='text-center'>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <h5>Reason</h5>
                            <hr/>
                            {modalUserData?.banReason}
                        </Card.Body>
                    </Card>
                    <p/>
                    <Card>
                        <Card.Body>
                            <h5>Details</h5>
                            <hr/>
                            {modalUserData?.banMessage}
                        </Card.Body>
                    </Card>
                    <p/>
                    <Card>
                        <Card.Body>
                            <h5>Banned Until</h5>
                            <hr/>
                            {new Date(modalUserData!.banUntil).toLocaleString()}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer className='d-flex flex-column'>
                    <div className='w-100 d-flex justify-content-end'>
                        <Button
                            className='mr-3'
                            onClick={unbanUser}
                        >Unban
                        </Button>
                        <Button
                            className='mr-3'
                            variant="secondary"
                            onClick={handleClose}
                        >Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
