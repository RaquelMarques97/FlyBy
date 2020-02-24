import React from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import Homepage from './Homepage.js';
import SimpleExample from './WhereISS.js';
import Challenge from './Challenge.js';
import Sighting from './Sighting.js';
import Crew from './Crew.js';
import Contact from './Contact.js';
import Footer from './Footer.js';
import Globe3D from './Globe3d.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (

    <HashRouter basename="/ISSProject">
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/WhereISS" component={SimpleExample} />
        <Route exact path="/Challenge" component={Challenge} />
        <Route exact path="/Sighting" component={Sighting} />
        <Route exact path="/Crew" component={Crew} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/Globe3d" component={Globe3D} />
      </Switch>
      <Footer />
    </HashRouter>
  );
}

export default App;
