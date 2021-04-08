import Footer from "./Footer";
import Header from "./Header";
import portrait from './images/portrait.jpg';


export default function Home() {
    return (
        <>
            <Header />
            <img id="portrait" src={portrait} alt="portrait" />
            <p id="homeBody">
                Akiva Strasser is a junior Full-Stack Javascript Developer with strong analytical skills who enjoys learning new technologies
                and applying them to build real-life applications. You can check out the source code for Akiva's
                projects on Github <a href="https://github.com/akivastr/firstProjects" target="_blank" rel="noreferrer">here</a>.

            </p>

            <Footer />
        </>
    )
}