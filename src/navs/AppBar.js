import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import {Link, useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const menuItems = [
    { label: 'Live Results', path: "/"},
    { label: 'IWWF Wakeboard Rules', path: "/rules" },
];
/*const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];*/

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

/*    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };*/

 /*   const navigate = useNavigate();*/

    return (
        <AppBar position="fixed" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/">
                                <img src="/images/iwwf.png" alt="Logo" style={{ height: '6.3vh' }} />
                            </Link>
                        </Box>

                        <Button
                            href= "/"
                            sx={{my: 2, color: '#808080', display: 'block'}}
                        >
                            International Waterski & Wakeboard Federation
                        </Button>
                    </Box>

                    <Box sx={{flexGrow: 0, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <a className="navbar-brand" href="/">
                            <img sx={{display: {xs: 'flex', md: 'flex'}, mr: 0}}
                                 src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/International_Waterski_%26_Wakeboard_Federation_logo.svg/1200px-International_Waterski_%26_Wakeboard_Federation_logo.svg.png"
                                 width="100%" height="50" alt=""/>
                        </a>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >

                            {menuItems.map(({ label, path }) => {
                                return (
                                    <Button
                                        key={label}
                                        href={path}
                                        sx={{my: 2, color: '#808080', display: 'block'}}
                                    >
                                        {label}
                                    </Button>
                                );
                            })}
                        </Menu>
                    </Box>

                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>

                        {menuItems.map(({ label, path }) => {
                            return (
                                <Button
                                    key={label}
                                    href={path}
                                    sx={{my: 2, color: '#808080', display: 'block'}}
                                >
                                    {label}
                                </Button>
                            );
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;