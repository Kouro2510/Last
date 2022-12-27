import Header from "~/Conpoments/Web/Header/Header";
import Footer from "~/Conpoments/Web/Footer/Footer";

const Home = ({children}) => {

    return (
        <section className={` dark:bg-gray-900 `}>
            <Header/>
            {children}
            <Footer/>
        </section>
    )
}
export default Home;