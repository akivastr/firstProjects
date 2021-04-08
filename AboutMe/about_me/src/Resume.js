import Header from './Header';
import resume from './images/resume.pdf';

export default function Resume() {

    return (
        <>
            <Header />
            <iframe title="resume" src={resume} alt="resume" width="1300" height="1000" />
        </>
    )
}