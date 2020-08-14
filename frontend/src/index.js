import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import Home from './components/home.jsx';
import Conversations from './components/conversations.jsx';
import Blogs from './components/blogs.jsx';
import About from './components/about.jsx';
import SubmitIdea from './components/ideaSubmission.jsx';
import Idea from './components/idea.jsx';
import EditBlog from './components/editBlog.jsx';
import BlogAdmin from './components/blogAdmin.jsx';
import ViewBlog from './components/viewBlog.jsx';
import Admin from './components/admin.jsx';
import Category from './components/category.jsx';
import UserProfile from './components/userProfile.jsx';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/conversations" component={Conversations}/>
        <Route exact path="/blogs" component={Blogs}/>
        <Route exact path="/submit" component={SubmitIdea}/>
        <Route exact path="/editBlog" component={EditBlog}/>
        <Route exact path="/blogAdmin" component={BlogAdmin}/>
        <Route path="/idea/:id" component={Idea}/>
        <Route path="/:category/idea" component={Category}/>

        <Route path="/blog/:id" component={ViewBlog}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/user/me" component={UserProfile}/>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
