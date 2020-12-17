import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Soluciones Examen</h1>
        <p>Seleccione una forma para ver su solución</p>
        <nav>
          <ul>
            <li>
              <Link to="/formas/1">Forma 1</Link>
            </li>
            <li>
              <Link to="/formas/original">Original (lo entregado para resolver el examen)</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div> 
  );
};

export default Home;
