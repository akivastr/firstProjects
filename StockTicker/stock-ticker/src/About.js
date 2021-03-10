import LinkList from "./Navbar";


export default function About() {
    return (
        <>
            <div className="navbarBground"></div>
            <LinkList />
            <div id="aboutContent">
                <h2 className="navbarItem">About</h2>
                <p>
                    <b>Market Watch</b> is a React.js single page application using functional components with hooks.
                It was developed by <a href="https://akivastr.github.io/firstProjects/AboutMe/index.html">Akiva Strasser</a>, a junior MERN Javascript developer who enjoys tackling challenges
                and learning new technologies. You can view the source code of Akiva's projects on <a href="https://github.com/akivastr/firstProjects" target="_blank" rel="noreferrer">Github</a>.
                </p>
            </div>
        </>
    )
}