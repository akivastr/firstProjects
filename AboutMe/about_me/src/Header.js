import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
// import 'bootstrap/dist/css/bootstrap.css';


export default function Header() {
    return (

        <header id="navbar">
            <Link to="/">
                <div className="navbarItem">
                    Akiva Strasser
                    <div className="navbarDescription">
                        Full-Stack Developer
                    </div>
                </div>
            </Link>
            <ul>
                <li className="navbarItem">
                    <Link to="/About">
                        About
                        <div className="navbarDescription">
                            About Me
                        </div>
                    </Link>
                </li>
                <li className="navbarItem">
                    <Link to="/Portfolio">
                        Portfolio
                        <div className="navbarDescription">
                            Selected Works
                    </div>
                    </Link>
                </li>
                <li>
                    <Dropdown >
                        <Dropdown.Toggle variant="success" id="dropdown-basic" >
                            Credentials
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link to="/About/Resume"> <div><Dropdown.Item href="#/action-1">Resume</Dropdown.Item></div></Link>
                            <div><Dropdown.Item href="https://www.linkedin.com/in/akiva-strasser-539042207">LinkedIn</Dropdown.Item></div>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </header>
    )
}
