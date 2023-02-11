import Drawer from "./Drawer";
import Sidebar from "./Sidebar";
import BoxTeste2 from "./BoxTeste2";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


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
        <Box sx ={{display:"flex"}}>
            <Drawer/>
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin:0 }}>
                <DrawerHeader />
                <Typography paragraph>
                    DASHBOARD DO MAURO MONTEIRO rsrs...
                </Typography>
            </Box>
        </Box>
    );
}

export default Dashboard;
