import React, { useState } from 'react'
import { Button, Container, Card, Modal, Row } from 'react-bootstrap';
import { IUser } from 'src/lib/types/data/user.type';
import { FindBanDetails } from 'src/hooks/banHooks';
import { getMostRecentBan, updateBan } from 'src/lib/api/banRoutes';
import { updateUser } from 'src/lib/api/userRoutes';
import { date } from 'yup';
import { IBanUser } from 'src/lib/types/data/banUser.type';

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

export const UserManagementUnbanModal = ({
    setShow,
    show,
    modalUser,
    currentUser,
    token
}: UnbanModalProps) => {
    let { data: modalUserData, isLoading: modalUserIsLoading, isError: modalUserIsError } = FindBanDetails(modalUser.id);
    const [bannedUserData, setBannedUserData] = useState<IBanUser>(modalUserData!);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleClose = () => setShow(false);
    const unbanUser = async () => {
        try {
            setIsSubmitting(true);
            modalUser.banned = false;
            modalUserData!.banUntil = new Date(Date.now())
            console.log(modalUserData);
            setBannedUserData(modalUserData!);
            await updateBan(bannedUserData, token)
            // await deleteBan(modalUser.id, token)
            await updateUser(modalUser, token, currentUser);
            // Reassign modalUserData
            modalUserData = await getMostRecentBan(modalUser.id);
            setBannedUserData(modalUserData!);
            console.log(bannedUserData);
            // console.log(modalUserData);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (modalUserIsError) {
        return (
            <div className="wrapper">
                <p>
                    Error occured while trying to retrieve ban details. Please try again later.
                </p>
            </div>
        );
    }

    if (modalUserIsLoading) {
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
                            <h5>Ban Type</h5>
                            <hr />
                            {bannedUserData?.banType}
                        </Card.Body>
                    </Card>
                    <p />
                    <Card>
                        <Card.Body>
                            <h5>Reason</h5>
                            <hr />
                            {bannedUserData?.banReason}
                        </Card.Body>
                    </Card>
                    <p />
                    <Card>
                        <Card.Body>
                            <h5>Details</h5>
                            <hr />
                            {bannedUserData?.banMessage},
                        </Card.Body>
                    </Card>
                    <p />
                    <Card>
                        <Card.Body>
                            <h5>Banned Until</h5>
                            <hr />
                            {new Date(bannedUserData?.banUntil).toLocaleString()}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer className='d-flex flex-column'>
                    <div className='w-100 d-flex justify-content-end'>
                        <Button
                            className='mr-3'
                            onClick={unbanUser}
                            disabled={isSubmitting ? true : false}
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
