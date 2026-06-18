import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const MIN_CHARACTERS = 7;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      'user',
      JSON.stringify({
        email,
        password,
      }),
    );
    history.push('/meals');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          required
        />
        <button
          type="submit"
          disabled={ !emailRegex.test(email) || password.length < MIN_CHARACTERS }
        >
          Login
        </button>
      </form>
    </div>
  );
}
