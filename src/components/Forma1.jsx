import '../App.css';
import logo from '../assets/solar-eclipse.jpg'

function Forma1() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <img src={logo} />
          <h1>Examen IIC2513 2020-2</h1>
        </div>
        <ul>
          <li>Username</li>
          <li><button>Salir</button></li>
        </ul>
      </header>
    </div>
  );
}

export default Forma1;
