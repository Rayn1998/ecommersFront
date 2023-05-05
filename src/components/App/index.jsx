import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Main from '../Main';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import { useSelector } from 'react-redux';
import Profile from '../Profile';

const App= () => {
  const user = useSelector(state => state.user.data);

  const [ loggedIn, setLoggedIn ] = useState(false);
  return (
    <div className="app">
      <Routes>
        <Route 
          exact 
          path='/' 
          element={<Main />} 
        />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
