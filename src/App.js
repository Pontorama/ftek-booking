import { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomeView from './views/HomeView';
import Header from './components/Header';
import Footer from './components/Footer';
import UserSessionContext from './context/UserSessionContext';
import Cookies from 'js-cookie';
import SettingsView from './views/SettingsView';
import ReservationsView from './views/ReservationsView';

function App() {
  const [userSession, setUserSession] = useState(Cookies.getJSON('user'));
  return (
    <UserSessionContext.Provider value={{userSession, setUserSession}}>
      <Router basename="/">
        <Header />
        <Switch>
          <Route path="/manage-reservations" component={_ => (userSession ? <ReservationsView /> : <Redirect to="/" />)} />
          <Route path="/settings" component={_ => (userSession ? <SettingsView /> : <Redirect to="/" />)} />
          <Route exact path="/" component={HomeView} />
          <Route path="/" component={_ => <Redirect to="/" />} />
        </Switch>
        <Footer />
      </Router>
    </UserSessionContext.Provider>
  );
}

export default App;
