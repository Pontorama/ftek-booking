import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import HomeView from './views/HomeView';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router basename="/">
      <Header />
      <Switch>
        <Route path="/dashboard" component={DashboardView} />
        <Route exact path="/" component={HomeView} />
        <Route path="/" component={_ => <Redirect to="/" />} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
