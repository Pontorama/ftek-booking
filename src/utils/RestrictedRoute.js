import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserSessionContext from './UserSessionContext';

const RestrictedRoute = ({ path, component }) => {
  const { userSession } = useContext(UserSessionContext);
  const RenderComponent = userSession ? <Route path={path} component={component} /> : <Redirect to="/" />
  return(
    <RenderComponent />
  );
};

export default RestrictedRoute;