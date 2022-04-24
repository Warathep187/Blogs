import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "../components/Navbar";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NavbarComponent />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
