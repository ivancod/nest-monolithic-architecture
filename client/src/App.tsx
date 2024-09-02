// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import { useAuth } from './hooks/useAuth';
import RegisterPage from './pages/RegisterPage';
import { NavLink } from 'react-router-dom';

const App: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <nav>
          <NavLink to="/user">Profile</NavLink>
          <button onClick={logout}>Logout</button>
        </nav>
      ) : (
        <nav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
      )}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/user" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/user" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/user" /> : <RegisterPage />}
        />
        <Route
          path="/user"
          element={user ? <UserPage /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
