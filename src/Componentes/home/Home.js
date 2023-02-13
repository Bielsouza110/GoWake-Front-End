import DemoCarousel from "./DemoCarousel";
import Cards from "./Cards";
import Search from "./Search";
import Subscribe from "./Subscribe";
import Footer from "./Footer";
import AppBar from "./AppBar"
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";

function Home() {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    return (
        <div className="sdd">
            <Box sx ={{display:"flex"}}>
                <AppBar/>
                <Box>
                    <DrawerHeader />
                    <DemoCarousel/>
                    <Cards/>
                    <Search/>
                    <Subscribe/>
                    <Footer/>
                </Box>
            </Box>
        </div>
    );
}

export default Home;