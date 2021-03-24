import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';

// Pages
import IdeasPage from './pages/IdeasPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SingleIdeaPage from './pages/SingleIdeaPage';
import Team404Page from './pages/Team404Page';
import TestPage from './pages/TestPage';

function App() {
  return (
    <div className="App">
      {/* maybe put layout content wrapping around switch case? */}
      <Header />
      <div className="main-content">
        <Switch>
          {/* Redirect?? */}
          <Route path='/' component={LandingPage} exact />
          <Route path='/ideas' component={IdeasPage} exact />
          <Route path='/ideas/:ideaId' component={SingleIdeaPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/test' component={TestPage} />
          <Route path='/*' component={Team404Page} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
