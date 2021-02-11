import Footer from './Footer';
import Masthead from './Masthead';

export default function Layout({children}) {
    return (
        <>
            <Masthead />
            {children}
            <Footer />
        </>
    );
}
