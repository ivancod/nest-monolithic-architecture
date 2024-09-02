import React from 'react';
import { useAuth } from '../hooks/useAuth';

const UserPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="container">
      <h2>User Info</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default UserPage;
