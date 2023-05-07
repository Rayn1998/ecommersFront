import { Route, Routes } from 'react-router-dom';

import Main from '../Main/Main';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import Admin from '../Admin/Admin';

const App= () => {
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
        <Route path='/profile' element={<Profile/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </div>
  );
}

export default App;
