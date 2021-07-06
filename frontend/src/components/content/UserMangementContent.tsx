import React from 'react'
import { Card, Table, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import { IUser } from 'src/lib/types/data/user.type';

interface UserMangementContentProps {
    users: IUser[];
}

export const UserMangementContent: React.FC<UserMangementContentProps> = ({users}) => {
        return (
            <Container>
            <h2 className="mb-4 mt-4">User Management</h2>
            <Card>
            <Card.Header>User Management Tool</Card.Header>
            <Card.Body>
            <Table bordered hover>
            <thead>
                <tr>
                <th scope="col">UserId</th>
                <th scope="col">User Type</th>
                <th scope="col">Email</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Controls</th>
                </tr>
            </thead>
            <tbody>
            {users?.map((req: IUser, index: number) => (
                <tr key={req.id}>
                    <td>{req.id}</td>
                    <td>{req.userType}</td>
                    <td>{req.email}</td>
                    <td>{req.fname}</td>
                    <td>{req.lname}</td>
                    <td>
                    <DropdownButton id="dropdown-basic-button" title="Controls">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Modify</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Ban</Dropdown.Item>
                    </DropdownButton>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
            </Card.Body>
        </Card>
        </Container>
        );
}