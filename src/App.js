import { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import HomeView from './views/HomeView';
import Header from './components/Header';
import Footer from './components/Footer';
import UserSessionContext from './context/UserSessionContext';

function App() {
  const [userSession, setUserSession] = useState(null);
  return (
    <UserSessionContext.Provider value={{userSession, setUserSession}}>
      <Router basename="/">
        <Header />
        <Switch>
          <Route path="/dashboard" component={DashboardView} />
          <Route exact path="/" component={HomeView} />
          <Route path="/" component={_ => <Redirect to="/" />} />
        </Switch>
        <Footer />
      </Router>
    </UserSessionContext.Provider>
  );
}

export default App;
