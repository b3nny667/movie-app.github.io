import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSignInAlt, FaHome } from 'react-icons/fa';

const Sign = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', passworwd: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    onLogin(form.email, redirectPath);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Sign In</Title>
        <Subtitle>Access your account to explore movies</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <InputContainer>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
            minLength="6"
          />
        </InputContainer>

        <ButtonGroup>
          <SubmitButton type="submit">
            <FaSignInAlt style={{ marginRight: '8px' }} />
            Sign In
          </SubmitButton>

          <HomeButton type="button" onClick={handleGoHome}>
            <FaHome style={{ marginRight: '8px' }} />
            Back to Home
          </HomeButton>
        </ButtonGroup>

        <SignUpText>
          Don't have an account? <SignUpLink to="/register">Register here</SignUpLink>
        </SignUpText>
      </Form>
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: var(--bg-primary);
  min-height: 100vh;
`;

const Form = styled.form`
  background-color: var(--bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  color: var(--text-primary);
  box-shadow: 0px 0px 15px var(--shadow-color);
  font-family: var(--font-roboto);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, rgba(249, 211, 180, 1) 0%, rgba(249, 211, 180, 0.8) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  text-align: center;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: var(--bg-tertiary);
  border: none;
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: 2px solid var(--accent-color);
    box-shadow: 0 0 0 3px rgba(249, 211, 180, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const BaseButton = styled.button`
  font-weight: bold;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SubmitButton = styled(BaseButton)`
  background-color: var(--accent-color);
  color: var(--bg-secondary);

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
  }
`;

const HomeButton = styled(BaseButton)`
  background-color: var(--bg-tertiary);
  color: var(--text-primary);

  &:hover {
    background-color: var(--accent-color);
    color: var(--bg-secondary);
  }
`;

const ErrorMessage = styled.p`
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff6b6b;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid rgba(255, 0, 0, 0.2);
`;

const SignUpText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  color: var(--text-secondary);
`;

const SignUpLink = styled(Link)`
  color: var(--accent-color);
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-primary);
    text-decoration: none;
  }
`;

export default Sign;