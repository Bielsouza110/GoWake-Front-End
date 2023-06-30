import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import DashboardIcon from '@mui/icons-material/Dashboard';
import StreamIcon from '@mui/icons-material/Stream';
import { Link, useNavigate } from 'react-router-dom';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function MiniDrawer() {
    const theme = useTheme();
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    const [open, setOpen] = React.useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElProfile, setAnchorElProfile] = React.useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
    const [userDetails, setUserDetails] = React.useState({
        name: usuarioSalvo.username.charAt(0).toUpperCase() + usuarioSalvo.username.slice(1).toLowerCase().trim(),
        role: usuarioSalvo.role === "None" ? "Guest" : usuarioSalvo.role.charAt(0).toUpperCase() + usuarioSalvo.role.slice(1).toLowerCase().trim()
    });

    const itemsList = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            link: "/login/dashboard"
        },
        {
            text: 'Upload XML',
            icon: <UploadFileIcon />,
            link: "/login/uploadxml"
        },
        {
            text: 'Wakeboard Rules',
            icon: <PictureAsPdfIcon />,
            link: "/login/rules"
        },
        /*{
            text: 'Live Results',
            icon: <StreamIcon/>,
            link: "/login/liveresults"
        },*/
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenProfileMenu = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setAnchorElProfile(null);
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} color="inherit">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={(event) => setMenuAnchorEl(event.currentTarget)}
                        sx={{
                            marginRight: 0,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <Tooltip title="Menu">
                            <MenuIcon />
                        </Tooltip>
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/login/dashboard">
                            <img src="/images/iwwf.png" alt="Logo" style={{ height: '6.3vh' }} />
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            href="/login/dashboard"
                            sx={{ my: 2, color: '#808080', display: 'block' }}
                        >
                            International Waterski & Wakeboard Federation
                        </Button>
                    </Box>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

                    <Box id="ssd">
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Profile">
                                <IconButton onClick={handleOpenProfileMenu} sx={{ p: 1 }}>
                                    <AccountCircleSharpIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Menu
                        id="profile-menu"
                        anchorEl={anchorElProfile}
                        open={Boolean(anchorElProfile)}
                        onClose={handleCloseProfileMenu}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                    >
                        <MenuItem disabled>
                            <Typography variant="subtitle1" gutterBottom style={{ display: 'block', marginBottom: 0 }}>
                                {userDetails.name}
                            </Typography>
                        </MenuItem>
                        <MenuItem disabled>
                            <Typography variant="body2" gutterBottom style={{ display: 'block', marginBottom: 0 }}>
                                {userDetails.role}
                            </Typography>
                        </MenuItem>

                        <Divider />
                        <MenuItem onClick={() => navigate('/')}>
                            <ListItemIcon>
                                <Tooltip>
                                    <Box display="flex" alignItems="left">
                                        <LogoutIcon fontSize="small" />
                                        <Typography variant="body2" style={{ marginLeft: '4px' }}>
                                            Logout
                                        </Typography>
                                    </Box>
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>
                    </Menu>

                    <Menu
                        id="dropdown-menu"
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={() => setMenuAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {itemsList.map((item, index) => (
                            <MenuItem key={index} component={Link} to={item.link}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MiniDrawer;
