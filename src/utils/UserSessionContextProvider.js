import { useState } from 'react';
import UserSessionContext from './UserSessionContext';
import Cookies from 'js-cookie';

const UserSessionContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(Cookies.getJSON('user'));
  return(
    <UserSessionContext.Provider value={{userSession, setUserSession}}>
      {children}
    </UserSessionContext.Provider>
  );
};

export default UserSessionContextProvider;