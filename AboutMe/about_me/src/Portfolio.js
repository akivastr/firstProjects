import Footer from "./Footer";
import Header from "./Header";
import stockImage from './images/stockImage.jpg';

export default function Portfolio() {
    return (
        <>
            <Header />
            <div id="portfolioImages">
                <a href="https://google.com">
                    <figure>

                        <img src={stockImage} alt="portrait" />

                        <figcaption>Stock App</figcaption>

                    </figure>
                </a>

            </div>
            <Footer />
        </>
    )
}