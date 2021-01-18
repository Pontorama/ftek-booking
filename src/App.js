import { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import HomeView from './views/HomeView';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SessionContext from './context/SessionContext';

function App() {
  const [session, setSession] = useState(false);
  return (
    <SessionContext.Provider value={{session, setSession}}>
      <Router basename="/">
        <Header />
        <Switch>
          <Route path="/dashboard" component={DashboardView} />
          <Route exact path="/" component={HomeView} />
          <Route path="/" component={_ => <Redirect to="/" />} />
        </Switch>
        <Footer />
      </Router>
    </SessionContext.Provider>
  );
}

export default App;
