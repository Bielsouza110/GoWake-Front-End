import Drawer from "./Drawer";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cards from "../home/Cards";
import DemoCarousel from "../home/DemoCarousel";

function Dashboard() {

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
                <Drawer/>
                <Box>
                    <DrawerHeader />
                    <DemoCarousel/>
                    <Cards/>
                </Box>
            </Box>
        </div>

    );
}

export default Dashboard;
