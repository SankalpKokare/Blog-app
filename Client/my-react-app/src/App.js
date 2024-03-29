import React from 'react';
import './App.css';
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Post from './Post';
import IndexPage from './page/IndexPage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './page/CreatePost';
function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<IndexPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/Register' element={<RegisterPage />} />
              <Route path='/create' element={<CreatePost />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>

    </>
  );
}

export default App;
