import React, { useState } from 'react';
import StockTable from './Table';
import Test from './Test';


function App() {
  const [stocks, setStocks] = useState<Stock[]>([])
  return (
    <>
      <Test stocks={stocks} setStocks={setStocks} />
      <StockTable setStocks={setStocks} stocks={stocks} />
    </>
  );
}

export default App;
