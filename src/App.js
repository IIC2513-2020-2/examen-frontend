import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FormasBase from './components/FormasBase';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/formas/:number" component={FormasBase} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
