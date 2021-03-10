import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TableInfo from './TableInfo';

export default function StockTable(props) {

    let [ticker, setTicker] = useState('AAPL');
    let [tableArray, setTableArray] = useState([{ lastPrice: '', lastTime: '' }]);
    let [options, setOptions] = useState([]);

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
                fetchStockInfo(company.ticker, company);
            } catch (error) {
                console.log(error);
            }
        })();
    }

    async function fetchStockInfo(ticker, company) {

        try {
            const response = await fetch(`https://api-v2.intrinio.com/securities/${ticker}/prices/realtime?api_key=OmMwMzkxNmViMGNkYzk5Yzk4ODBhZmFmM2U1NWUzM2Mw`);
            const stockInfo = await response.json();
            console.log(stockInfo);
            let date = new Date(stockInfo.last_time);
            let formattedTimeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`;
            let tableArr = [...tableArray, { name: company.name, sector: company.sector, lastPrice: stockInfo.last_price, lastTime: formattedTimeString }];
            setTableArray(tableArr);
        } catch (error) {
            console.log(error);
        }
    }

    const mappedTableData = tableArray.map(element => <TableInfo name={element.name} sector={element.sector} price={element.lastPrice} time={element.lastTime} />)
    return (
        <>
            <Navbar />
            <div className="marginPage">
                <label>Enter Stock Ticker Symbol:</label>
                <select onChange={e => setTicker(e.target.value)}>{options}</select>
                <button onClick={fetchStock}>Add Stock</button>
                <table >
                    <thead>
                        <tr>
                            <th>Stock Name</th>
                            <th>Sector</th>
                            <th>Price</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedTableData}
                    </tbody>
                </table>
            </div>
        </>
    )
}