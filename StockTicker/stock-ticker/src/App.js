import Ticker from './Ticker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import StockTable from './StockTable';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Route path="/stockInfo">
          <Ticker />
        </Route>
        <Route path="/compareStocks">
          <StockTable />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </BrowserRouter>

    </div>
  );
}

export default App;

