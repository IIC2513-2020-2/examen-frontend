import { useParams } from 'react-router-dom';
import Forma1 from './Forma1';

function InvalidForma() {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Forma no válida</h1>
        <p>Las formas válidas son 1, 2 y 3.</p>
      </div>
    </div> 
  );
}

function getForma(number) {
  let component;
  switch (number) {
    case "1":
      component = Forma1;
      break;
    default:
      component = InvalidForma;
  }
  return component;
}

function FormasBase() {
  const { number } = useParams();
  const Component = getForma(number);

  return <Component />;
}

export default FormasBase;
