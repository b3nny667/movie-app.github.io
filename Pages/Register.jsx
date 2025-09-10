import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPass) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
  
    console.log(form);
    navigate('/sign'); 
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join our movie community today</p>

        {error && <p className="error">{error}</p>}

        <div className="row">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          minLength="6"
        />
        <input
          name="confirmPass"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPass}
          onChange={handleChange}
          required
          minLength="6"
        />

        <button type="submit">Register</button>
        <p className="signin">
          Already have an account? <a href="/sign">Sign in</a>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background-color: var(--bg-primary);
  min-height: 100vh;

  .form {
    background-color: var(--bg-secondary);
    padding: 2.5rem;
    border-radius: 1rem;
    width: 100%;
    max-width: 400px;
    color: var(--text-primary);
    box-shadow: 0px 0px 15px var(--shadow-color);
    font-family: var(--font-roboto);
  }

  .title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: var(--accent-color);
    text-align: center;
  }

  .subtitle {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
    text-align: center;
  }

  .row {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 12px;
    background-color: var(--bg-tertiary);
    border: none;
    border-radius: 8px;
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;

    &::placeholder {
      color: var(--text-secondary);
      opacity: 0.7;
    }

    &:focus {
      outline: 2px solid var(--accent-color);
      box-shadow: 0 0 0 3px rgba(211, 84, 0, 0.2);
    }
  }

  button {
    background-color: var(--accent-color);
    color: var(--bg-secondary);
    font-weight: bold;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    transition: all 0.3s ease;
    font-family: var(--font-roboto);
    margin-top: 0.5rem;

    &:hover {
      background-color: var(--bg-tertiary);
      color: var(--accent-color);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .error {
    background-color: rgba(255, 0, 0, 0.1);
    color: #ff6b6b;
    padding: 0.75rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    text-align: center;
    border: 1px solid rgba(255, 0, 0, 0.2);
  }

  .signin {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 1.5rem;
    color: var(--text-secondary);
  }

  .signin a {
    color: var(--accent-color);
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
      color: var(--text-primary);
      text-decoration: none;
    }
  }
`;

export default Register;