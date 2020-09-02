import React from 'react';
import {Route} from 'react-router-dom';
import SignIn from './components/Form/SignIn/SignIn';
import SignUp from './components/Form/SignUp/SignUp';
import Upload from './components/Upload/Upload';
import Dashboard from './components/Dashboard/Dashboard';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import SignOut from './components/SignOut/SignOut';
function App() {
  return (
    <React.Fragment>
       <Route exact path="/" component={Dashboard}></Route>
       <Route exact path="/video/:videoTitle"  component={VideoPlayer}></Route>
       <Route exact path="/signIn" component={SignIn}></Route>
       <Route exact path="/signUp" component={SignUp}></Route>
       <Route exact path="/upload" component={Upload}></Route>
       <Route exact path='/signOut' render={SignOut}></Route>

    </React.Fragment>
   
  );
}

export default App;
