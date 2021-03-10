import { Link } from 'react-router-dom';
import logo from './images/freepik-trend.png';

function Navbar() {
    return (
        <ul className="navbar">
            <li>
                <Link to="/">
                    <span id="logo"><img src={logo} alt="logo" /> MarketWatch</span>
                </Link>
            </li>
            <li>
                <Link to="/About">
                    <span>About</span>
                </Link>
            </li>
            <li>
                <Link to="/stockInfo">
                    <span>Stock Info</span>
                </Link>
            </li>
            <li>
                <Link to="/compareStocks">
                    <span>Compare Stocks</span>
                </Link>
            </li>
        </ul>

    )
}

export default Navbar;