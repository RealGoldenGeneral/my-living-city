import React, { useState } from 'react'
import { Card, Table, Dropdown, Container, Button, Form, NavDropdown } from 'react-bootstrap';
import { updateIdeaStatus } from 'src/lib/api/ideaRoutes';
import { updateUser } from 'src/lib/api/userRoutes';
import { USER_TYPES } from 'src/lib/constants';
import { IIdeaWithAggregations } from 'src/lib/types/data/idea.type';
import { IProposalWithAggregations } from 'src/lib/types/data/proposal.type';
import { IUser } from 'src/lib/types/data/user.type';
import { UserSegmentInfoCard } from '../partials/UserSegmentInfoCard';

// THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO 
// THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO 
// THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO 
interface ProposalManagementContentProps {
    users: IUser[] | undefined;
    token: string | null;
    user: IUser | null;
    proposals: IProposalWithAggregations[] | undefined;
    ideas: IIdeaWithAggregations[] | undefined;
}

export const ProposalManagementContent: React.FC<ProposalManagementContentProps> = ({users, token, user, proposals, ideas}) => {
    const [hideControls, setHideControls] = useState('');
    const [showUserSegmentCard, setShowUserSegmentCard] = useState(false);
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [ban ,setBan] = useState<boolean>(false);
    const UserSegmentHandler = (email: string, id: string) => {
        setShowUserSegmentCard(true);
        setEmail(email);
        setId(id);
    }
    const ProposalURL = '/proposals/';
    const userTypes = Object.keys(USER_TYPES);
    let userEmails: String[] = [];
    let proposalIdeas: IIdeaWithAggregations[] = [];

    if(ideas){
        for(let i = 0; i < ideas.length; i++){
            if(ideas[i].state === "PROPOSAL"){
                proposalIdeas.push(ideas[i]);
            }
        }
    }
    if(proposals && users){
        for(let i = 0; i < proposals!.length; i++){
            for(let z = 0; z < users!.length; z++){
                if(proposals[i].idea.authorId!.toString() === users[z].id.toString()){
                    userEmails.push(users[z].email);
                }
            }
        }
    }
    console.log("Propideas");
    console.log(proposalIdeas);
        return (
            <Container>
            <Form>
            <h2 className="mb-4 mt-4">Proposal Management</h2>
            <Card>
            <Card.Header>Proposal Management Tool</Card.Header>
            <Card.Body>
            <Table bordered hover size="sm">
            <thead>
                <tr>
                <th scope="col">User Email</th>
                <th scope="col">Name</th>
                <th scope="col">Proposal Title</th>
                <th scope="col">Proposal Description</th>
                <th scope="col">Proposal Link</th>
                <th scope="col">Number of Flags</th>
                <th scope="col">Segment</th>
                <th scope="col">Active</th>
                <th scope="col">Controls</th>
                </tr>
            </thead>
            <tbody>
            {proposals?.map((req: IProposalWithAggregations, index: number) => (
                <tr key={req.id}>
                    {req.id.toString() !== hideControls ? 
                    <>
                    <td>{userEmails[index]}</td>
                    
                    <td>{proposalIdeas[index].firstName}</td>
                    <td>{req.idea.title}</td>
                    <td>{req.idea.description}</td>
                    <td><a href= {ProposalURL + req.id}>Link</a></td> 
                    <td>{proposalIdeas[index].negRatings}</td>
                    <td>{proposalIdeas[index].segmentName}</td>
                    <td>{req.idea.active ? "Yes" : "No"}</td>
                    </> :<>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><Form.Check type="switch" checked={req.idea.active} onChange={(e)=>{
                        req.idea.active = e.target.checked;
                        setBan(e.target.checked)
                        }} id="ban-switch"/></td>  
                    </>
                }

                    <td>
                    {req.id.toString() !== hideControls ?
                        <NavDropdown title="Controls" id="nav-dropdown">
                            <Dropdown.Item onClick={()=>{
                                setHideControls(req.id.toString());
                                setBan(req.idea.active);
                                }}>Edit</Dropdown.Item>
                        </NavDropdown>
                        : <>
                        <Button size="sm" variant="outline-danger" className="mr-2 mb-2" onClick={()=>setHideControls('')}>Cancel</Button>
                        <Button size="sm" onClick={()=>{
                            setHideControls('');
                            console.log(req);
                            updateIdeaStatus(token, user?.id, req.idea.id.toString(), req.idea.active);
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