import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from '../Main';
import SignUp from '../SignUp';

const App: FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='sign-up' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
