import Header from "~/Conpoments/Web/Header/Header";
import Footer from "~/Conpoments/Web/Footer/Footer";

const LayoutHome = ({children}) => {

    return (
        <section>
            <Header/>
            {children}
            <Footer/>
        </section>
    )
}
export default LayoutHome;