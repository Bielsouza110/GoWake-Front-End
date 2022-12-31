import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from "./Componentes/NavBar";
import DemoCarousel from "./Componentes/DemoCarousel";
import Cards from "./Componentes/Cards";
import Search from "./Componentes/Search";
import Subscribe from "./Componentes/Subscribe";
import Footer from "./Componentes/Footer";

function App() {
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

export default App;
