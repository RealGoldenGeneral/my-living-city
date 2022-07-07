import React, { useState } from 'react'
import { Card, Table, Dropdown, Container, Button, Form, NavDropdown } from 'react-bootstrap';
import { updateCommentStatus } from 'src/lib/api/commentRoutes';
import { updateUser } from 'src/lib/api/userRoutes';
import { USER_TYPES } from 'src/lib/constants';
import { IComment } from 'src/lib/types/data/comment.type';
import { IIdeaWithAggregations } from 'src/lib/types/data/idea.type';
import { IUser } from 'src/lib/types/data/user.type';
import { UserSegmentInfoCard } from '../partials/UserSegmentInfoCard';

// THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO 
// THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO 
// THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO // THIS IS STILL TO DO 
interface CommentManagementContentProps {
    users: IUser[] | undefined;
    token: string | null;
    user: IUser | null;
    comments: IComment[] | undefined; 
    ideas: IIdeaWithAggregations[] | undefined;
}

export const CommentManagementContent: React.FC<CommentManagementContentProps> = ({users, token, user, comments, ideas}) => {
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
    let userEmail: String[] = []
    let userName: String[] = []
    let commentType: String[] = []
    if(comments && users){
        for(let i = 0; i < comments!.length; i++){
            for(let z = 0; z < users!.length; z++){
                if(comments[i].authorId!.toString() === users[z].id.toString()){
                    userEmail.push(users[z].email);
                    userName.push(users[z].fname!);
                }
            }
        }
    }
    if(comments && ideas){
        for(let i = 0; i < comments!.length; i++){
            for(let z = 0; z < ideas!.length; z++){
                if(comments[i].ideaId.toString() === ideas[z].id.toString()){
                    commentType.push(ideas[z].state);
                }
            }
        }
    }
    const userTypes = Object.keys(USER_TYPES);
    const ideaURL = '/ideas/';
    console.log(comments);
        return (
            <Container>
            <Form>
            <h2 className="mb-4 mt-4">Comment Management</h2>
            <Card>
            <Card.Header>Comment Management Tool</Card.Header>
            <Card.Body>
            <Table bordered hover size="sm">
            <thead>
                <tr>
                <th scope="col">User Email</th>
                <th scope="col">User Name</th>
                <th scope="col">Post Type</th>
                <th scope="col">Post Link</th>
                <th scope="col">Comment Contents</th>
                <th scope="col">Number of Flags</th>
                <th scope="col">Region</th>
                <th scope="col">Active</th>
                <th scope="col">Controls</th>
                </tr>
            </thead>
            <tbody>
            {comments?.map((req: IComment, index: number) => (
                <tr key={req.id}>
                    {req.id.toString() !== hideControls ? 
                    <>
                    <td>{userEmail[index]}</td>
                    
                    <td>{userName[index]}</td>
                    <td>{commentType[index]}</td>
                    <td>{<a href= {ideaURL + req.ideaId}>Link</a>}</td>
                    <td>{req.content}</td> 
                    <td>{req.commentFlagNumber}</td>
                    <td>{"CRD"}</td>
                    <td>{req.active ? "Yes" : "No"}</td>
                    </> :<>
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
                    </>
                }

                    <td>
                    {req.id.toString() !== hideControls ?
                        <NavDropdown title="Controls" id="nav-dropdown">
                            <Dropdown.Item onClick={()=>{
                                setHideControls(req.id.toString());
                                setBan(req.active);
                                }}>Edit</Dropdown.Item>
                        </NavDropdown>
                        : <>
                        <Button size="sm" variant="outline-danger" className="mr-2 mb-2" onClick={()=>setHideControls('')}>Cancel</Button>
                        <Button size="sm" onClick={()=>{
                            setHideControls('');
                            console.log(req);
                            //updateIdeaStatus(token, user?.id, req.idea.id.toString(), req.idea.active);
                            updateCommentStatus(token, user?.id, req.id.toString(), req.active);
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