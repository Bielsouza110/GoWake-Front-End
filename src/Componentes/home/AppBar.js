import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";

const pages = ['Live Results', 'IWWF Wakeboard Rules'];
const menuItems = [
    { label: 'Live Results', path: "/"},
    { label: 'IWWF Wakeboard Rules', path: "https://iwwf.sport/wp-content/uploads/2022/05/IWWFWakeboardBoatRules-2022.pdf" },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
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

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();

    return (
        <AppBar position="fixed" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <a href="/">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/International_Waterski_%26_Wakeboard_Federation_logo.svg/1200px-International_Waterski_%26_Wakeboard_Federation_logo.svg.png"
                                width="100%" height="50" alt=""/>
                        </a>
                        <Typography
                            component="a"
                            variant="h6"
                            noWrap
                            href="/"
                            sx={{
                                marginLeft: 2,
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.0rem',
                                color: '#808080',
                                textDecoration: 'none',
                                alignItems: 'center'
                            }}
                        >
                            International Waterski & Wakeboard Federation
                        </Typography>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color='#808080'
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
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

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

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Login" href="/login">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 1}}>
                                <LoginIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;