import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from '../Main';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import RouteCheck from '../RouteCheck';

const App= () => {
  const [ loggedIn, setLoggedIn ] = useState(false);
  return (
    <div className="app">
      <Routes>
        <Route path='/' exact loggedIn={loggedIn} element={RouteCheck} >
          <Route path='/' element={<Main />} />
        </Route>

        {/* <ProtectedRoute loggedIn={loggedIn} path='/' element={<Main />} /> */}
        <Route path='sign-up' element={<SignUp />} />
        <Route path='sign-in' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
