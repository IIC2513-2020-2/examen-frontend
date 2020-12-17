import { useState } from 'react';

function Login({ error, onLogin }) {
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setPayload((payload) => ({
      ...payload,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(payload);
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {error && (
          <div className="error">{error}</div>
        )}
        <h1>Login Examen</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={payload.email}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={payload.password}
            />
          </div>
          <div className="actions">
            <button>Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
