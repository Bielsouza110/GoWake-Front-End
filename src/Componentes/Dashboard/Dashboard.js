import Drawer from "./Drawer";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cards from "../home/Cards";
import DemoCarousel from "../home/DemoCarousel";
import { useLocation } from 'react-router-dom';

function Dashboard() {

    const location = useLocation();
    const objetoComState = location.state || null;
    const nome = objetoComState?.username || 'Nome não fornecido';
    const email = objetoComState?.email || 'Email não fornecido';


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
                    <Typography variant="h4" component="div" gutterBottom>
                        Welcome to the Dashboard
                    </Typography>

                    <div>
                        <p>Nome: {nome}</p>
                        <p>Email: {email}</p>
                    </div>
                    <Cards/>
                </Box>
            </Box>
        </div>

    );
}

export default Dashboard;
