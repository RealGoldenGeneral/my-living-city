import React, { useState } from 'react'
import { Card, Table, Dropdown, Container, Button, Form, NavDropdown } from 'react-bootstrap';
import { updateFalseFlagIdea } from 'src/lib/api/flagRoutes';
import { updateIdeaStatus } from 'src/lib/api/ideaRoutes';
import { updateUser } from 'src/lib/api/userRoutes';
import { USER_TYPES } from 'src/lib/constants';
import { IFlag } from 'src/lib/types/data/flag.type';
import { IIdeaWithAggregations } from 'src/lib/types/data/idea.type';
import { IUser } from 'src/lib/types/data/user.type';
import { UserSegmentInfoCard } from '../partials/UserSegmentInfoCard';

// THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO 
// THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO 
// THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO 
interface IdeaManagementContentProps {
    users: IUser[] | undefined;
    token: string | null;
    user: IUser | null;
    ideas: IIdeaWithAggregations[] | undefined;
    flags: IFlag[] | undefined;
}
export const IdeaManagementContent: React.FC<IdeaManagementContentProps> = ({users, token, user, ideas, flags}) => {
    const [hideControls, setHideControls] = useState('');
    const [showUserSegmentCard, setShowUserSegmentCard] = useState(false);
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [ban ,setBan] = useState<boolean>(false);
    const [reviewed, setReviewed] = useState<boolean>(false);
    const UserSegmentHandler = (email: string, id: string) => {
        setShowUserSegmentCard(true);
        setEmail(email);
        setId(id);
    }
    const ideaURL = '/ideas/';
    const userTypes = Object.keys(USER_TYPES);
    let userEmails: String[] = [];
    let ideaFlags: number[] = [];
    if(ideas){
        for(let i = 0; i < ideas.length; i++){
            if(ideas[i].state === "PROPOSAL"){
                //ideas.splice(i, 1);
            }
        }
    }

    if(ideas && users){
        for(let i = 0; i < ideas!.length; i++){
            for(let z = 0; z < users!.length; z++){
                if(ideas[i].authorId!.toString() === users[z].id.toString()){
                    userEmails.push(users[z].email);
                }
            }
        }
    }
    if(ideas && flags){
        for(let i = 0; i < ideas!.length; i++){
            let counter = 0;
            for(let z = 0; z < flags!.length; z++){
                if(ideas[i].id === flags[z].ideaId){
                    counter++;
                }
                if(z === flags!.length-1){
                    ideaFlags.push(counter);
                }
            }
        }
    }
    console.log(ideas);
        return (
            <Container>
            <Form>
            <h2 className="mb-4 mt-4">Idea Management</h2>
            <Card>
            <Card.Body style={{padding: '0'}}>
            <Table bordered hover size="sm">
            <thead>
            <tr style={{backgroundColor: 'rgba(52, 52, 52, 0.1)',height: '15'}}>
                <th scope="col">User Email</th>
                <th scope="col">Name</th>
                <th scope="col">Idea Title</th>
                <th scope="col">Idea Description</th>
                <th scope="col">Idea Link</th>
                <th scope="col">Number of Flags</th>
                <th scope="col">Segment</th>
                <th scope="col">Active</th>
                <th scope="col">Reviewed</th>
                <th scope="col">Controls</th>
                </tr>
            </thead>
            <tbody>
            {ideas?.map((req: IIdeaWithAggregations, index: number) => (
                <tr key={req.id}>
                    {req.id.toString() !== hideControls ? 
                    <>
                    <td>{userEmails[index]}</td>
                    <td>{req.firstName}</td>
                    <td>{req.title}</td>
                    <td>{req.description}</td>
                    <td><a href= {ideaURL + req.id}>Link</a></td> 
                    <td>{ideaFlags[index].toString()}</td>
                    <td>{req.segmentName}</td>
                    <td>{req.active ? "Yes" : "No"}</td>
                    <td>{req.reviewed ? "Yes":"No"}</td>
                    </> : <>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><Form.Check type="switch" checked={req.active} onChange={(e)=>{
                        req.active = e.target.checked;
                        setBan(e.target.checked)
                        }} id="ban-switch"/></td>
                        <td><Form.Check type="switch" checked={req.reviewed} onChange={(e)=>{
                        req.reviewed = e.target.checked;
                        setReviewed(e.target.checked)
                        }} id="reviewed-switch"/></td>    
                    </>
                    }
                    <td>
                    {req.id.toString() !== hideControls ?
                        <NavDropdown title="Controls" id="nav-dropdown">
                            <Dropdown.Item onClick={()=>{
                                setHideControls(req.id.toString());
                                setBan(req.active);
                                setReviewed(req.reviewed);
                                }}>Edit</Dropdown.Item>
                        </NavDropdown>
                        : <>
                        <Button size="sm" variant="outline-danger" className="mr-2 mb-2" onClick={()=>setHideControls('')}>Cancel</Button>
                        <Button size="sm" onClick={()=>{
                            setHideControls('');
                            console.log(req);
                            if(req.active === true && req.reviewed === true){
                                updateFalseFlagIdea(parseInt(req.id.toString()), token!, true);
                            }else{
                                updateFalseFlagIdea(parseInt(req.id.toString()), token!, false);
                            }
                            updateIdeaStatus(token, user?.id, req.id.toString(), req.active, req.reviewed);
                            }}>Save</Button>
                        </>
                    }

                    </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            </Card.Body>
        </Card>
        </Form>
        <br></br>
        {/* <UserSegmentHandler/> */}
        {showUserSegmentCard && <UserSegmentInfoCard email={email} id={id} token={token}/>}
        </Container>
        );
}