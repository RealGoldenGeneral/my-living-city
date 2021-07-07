import React, { useState } from 'react'
import { Card, Table, DropdownButton, Dropdown, Container, Button } from 'react-bootstrap';
import { IUser } from 'src/lib/types/data/user.type';

interface UserMangementContentProps {
    users: IUser[];
}

export const UserMangementContent: React.FC<UserMangementContentProps> = ({users}) => {
    const [showControls, setShowControls] = useState(true);
    const [hideControls, setHideControls] = useState('');
        return (
            <Container>
            <h2 className="mb-4 mt-4">User Management</h2>
            <Card>
            <Card.Header>User Management Tool</Card.Header>
            <Card.Body>
            <Table bordered hover>
            <thead>
                <tr>
                <th scope="col">Email</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">User Type</th>
                <th scope="col">Controls</th>
                </tr>
            </thead>
            <tbody>
            {users?.map((req: IUser, index: number) => (
                <tr key={req.id}>
                    <td>{req.email}</td>
                    <td>{req.fname}</td>
                    <td>{req.lname}</td>
                    <td>{req.userType}</td>
                    <td>
                    {req.id !== hideControls ?
                        <DropdownButton id="dropdown-basic-button" title="Controls" variant="outline-primary">
                            <Dropdown.Item href="#/action-1" onClick={()=>setHideControls(req.id)}>Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={()=>console.log('hello')}>Edit</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" onClick={()=>console.log('hello')}>Ban</Dropdown.Item>
                        </DropdownButton>
                        : <><Button className="mr-2" size="sm">Save</Button><Button size="sm" variant="danger">Cancel</Button></>
                    }

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