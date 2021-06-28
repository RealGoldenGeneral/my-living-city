import React from 'react'
import {Button, Card} from 'react-bootstrap';
interface UserSegmentCardProps {

}

export const UserSegmentCard: React.FC<UserSegmentCardProps> = ({}) => {
        return (
        <Card>
            <Card.Header>Segment and SubSegment Requests<Button className="float-right" size="sm">View Requests</Button></Card.Header>
            <Card.Body>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
<<<<<<< HEAD
                <th scope="col">Name</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
=======
                <th scope="col">Country</th>
                <th scope="col">Canada</th>
                <th scope="col">Province</th>
>>>>>>> Capstone-Dev
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </table>
            </Card.Body>
        </Card>
        );
}