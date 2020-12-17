import logo from '../assets/solar-eclipse.jpg'

function Header({ onLogout, userName }) {
  return (
    <header className="app-header">
      <div className="brand">
        <img src={logo} />
        <h1>Examen IIC2513 2020-2</h1>
      </div>
      <ul>
        <li>{userName}</li>
        <li>
          <button onClick={onLogout}>
            Salir
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
