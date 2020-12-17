import { useState } from 'react';
import '../App.css';
import Header from './Header';
import Login from './Login';

const API_BASE_URL = 'http://localhost:3000';
const LOGIN_ERROR_MSG = 'Hubo un error con el inicio de sesión';

function fetchLogin(payload) {
  return fetch(`${API_BASE_URL}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

function Forma1() {
  const [token, setToken] = useState();
  const [userName, setUserName] = useState();
  const [loginError, setLoginError] = useState();

  const login = async (payload) => {
    try {
      const response = await fetchLogin(payload);
      if (response.status === 201) {
        const { name, token } = await response.json();
        setToken(token);
        setUserName(name);
      } else {
        setLoginError(LOGIN_ERROR_MSG);
      }
    } catch (e) {
      setLoginError(LOGIN_ERROR_MSG);
    }
  }

  const logout = () => {
    setToken();
    setUserName();
    setLoginError();
  }

  if (!token) return (
    <Login
      onLogin={login}
      error={loginError}
    />
  );

  return (
    <div className="app">
      <Header
        onLogout={logout}
        userName={userName}
      />
    </div>
  );
}

export default Forma1;
