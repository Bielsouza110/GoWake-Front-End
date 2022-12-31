import NavBar from "./NavBar";
import DemoCarousel from "./DemoCarousel";
import Cards from "./Cards";
import Search from "./Search";
import Subscribe from "./Subscribe";
import Footer from "./Footer";

function Home() {
    return (
        <div>
            <NavBar/>
            <DemoCarousel/>
            <Cards/>
            <Search/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}

export default Home;