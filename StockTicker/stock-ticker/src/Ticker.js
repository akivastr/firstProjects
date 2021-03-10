import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import StockInfo from './StockInfo';

export default function Ticker(props) {

    let [ticker, setTicker] = useState('AAPL');
    let [selectedStock, setStock] = useState({});
    let [stockInfo, setStockInfo] = useState({ lastPrice: '', lastTime: '' });
    let [options, setOptions] = useState([]);
    let [theInterval, setTheInterval] = useState({});

    useEffect(() => getOptions(), []);

    async function getOptions() {
        try {
            const response = await fetch(`https://api-v2.intrinio.com/companies?has_stock_prices=true&api_key=OmMwMzkxNmViMGNkYzk5Yzk4ODBhZmFmM2U1NWUzM2Mw`)
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            let r = await response.json();
            console.log('the companies:', r.companies);
            setOptions(r.companies.map(company => <option value={company.ticker}>{company.ticker}</option>));
        } catch (error) {
            console.log(error);
        }
    }

    const fetchStock = () => {
        (async () => {
            try {
                const response = await fetch(`https://api-v2.intrinio.com/companies/${ticker}?api_key= OmMwMzkxNmViMGNkYzk5Yzk4ODBhZmFmM2U1NWUzM2Mw`);
                const company = await response.json();
                console.log(company, 'company');
                setStock({ name: company.name, description: company.long_description, sector: company.sector });
                fetchStockInfo(company.ticker);
            } catch (error) {
                console.log(error);
            }
        })();
    }

    function fetchStockInfo(ticker) {
        clearInterval(theInterval);
        let interval = setInterval(
            async () => {
                try {
                    const response = await fetch(`https://api-v2.intrinio.com/securities/${ticker}/prices/realtime?api_key=OmMwMzkxNmViMGNkYzk5Yzk4ODBhZmFmM2U1NWUzM2Mw`);
                    const stockInfo = await response.json();
                    console.log(stockInfo);
                    let date = new Date(stockInfo.last_time);
                    let formattedTimeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`;
                    setStockInfo({ lastPrice: stockInfo.last_price, lastTime: formattedTimeString })
                } catch (error) {
                    console.log(error);
                }
            }
            , 2000)
        setTheInterval(interval);
    }

    const stockDescription = props.type ? selectedStock.sector : selectedStock.description;
    return (
        <>
            <Navbar />
            <div className="marginPage">
                <label>Enter Stock Ticker Symbol:</label>
                <select onChange={e => setTicker(e.target.value)}>{options}</select>
                <button onClick={fetchStock}>Update</button>
                <StockInfo name={selectedStock.name} description={stockDescription} price={stockInfo.lastPrice} time={stockInfo.lastTime} />
            </div>
        </>
    )
}