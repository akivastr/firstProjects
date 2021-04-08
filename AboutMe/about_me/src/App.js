import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Portfolio from './Portfolio';
import Resume from './Resume';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Portfolio">
          <Portfolio />
        </Route>
        <Route path="/About/Resume">
          <Resume />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
