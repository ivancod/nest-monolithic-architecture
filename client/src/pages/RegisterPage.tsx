import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';

interface RegisterFormInputs {
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const { register, loading, errors } = useAuth();
  const { register: registerForm, handleSubmit } =
    useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    await register(data.email, data.password);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        {errors && <span className="error">{errors}</span>}

        <div className="form-control">
          <label>Email:</label>
          <input
            type="email"
            {...registerForm('email', { required: 'Email is required' })}
          />
        </div>

        <div className="form-control">
          <label>Password:</label>
          <input
            type="password"
            {...registerForm('password', { required: 'Password is required' })}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
