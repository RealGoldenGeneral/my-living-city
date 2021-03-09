import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import IdeasPage from './pages/IdeasPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import Team404Page from './pages/Team404Page';

function App() {
  return (
    <div className="App">
      {/* maybe put layout content wrapping around switch case? */}
      <div className="main-content">
        <Switch>
          <Route path='/' component={LandingPage} exact />
          <Route path='/ideas' component={IdeasPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/*' component={Team404Page} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
