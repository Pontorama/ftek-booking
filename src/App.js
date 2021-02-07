import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomeView from './views/HomeView';
import SettingsView from './views/SettingsView';
import ReservationsView from './views/ReservationsView';
import ErrorHandler from './utils/ErrorHandler';
import RestrictedRoute from './utils/RestrictedRoute';
import UserSessionContextProvider from './utils/UserSessionContextProvider';
import Header from './components/Header';
import Footer from './components/Footer';

 const App = () => {
  return (
    <ErrorHandler>
    <UserSessionContextProvider>
      <Router basename="/">
        <Header />
        <Switch>
          <RestrictedRoute path="/reservations" component={ReservationsView} />
          <RestrictedRoute path="/settings" component={SettingsView} />
          <Route exact path="/" component={HomeView} />
          <Route path="/" component={() => <Redirect to="/" />} />
        </Switch>
        <Footer />
      </Router>
    </UserSessionContextProvider>
    </ErrorHandler>
  );
};

export default App;