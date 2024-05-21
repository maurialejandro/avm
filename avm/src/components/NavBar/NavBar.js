import React, {useState} from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem
} from "@mui/material";
import logo from "../../logo.svg";
import { Container } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import '../styles/FormStyles.css';
import {useAuthContext, useUserLogout} from "../../context/AuthContext";
import {deleteToken} from "../../api/handleToken/handleToken";
import {enqueueSnackbar} from "notistack";
import {logoutSession} from "../../services/authAdmins";

export default function NavBar(){
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigation = useNavigate();
    const user = useAuthContext();
    const logout = useUserLogout();
    const navigate = useNavigate();

    // add in a separate type array of proyect
    const pages = [
        { name: 'Valoraciones', pathAdmin: '/appreciations', pathSupervisor: '/supervisor-appreciations', },
        { name: 'Clientes', pathAdmin: '/clients', pathSupervisor: '/supervisor-clients', }
    ];
    const theme = createTheme({
        palette: {
            primary: {
                main: "#0A0F3E",
            },
        },
    });
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
    const handleLogout = async () => {
        const res = await logoutSession();
        if(res.success === true){
            await deleteToken();
            await logout();
            navigate('/');
            enqueueSnackbar("Cerraste sesión satisfactoriamente", {
                variant: "success",
            });
        }
        if(res.success === false){
            enqueueSnackbar("Error al intentar cerrar sesion", {
                variant: "error",
            });
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontWeight: 600,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                className="logo"
                                style={{
                                    marginLeft: "3.5rem",
                                    marginRight: "1.5rem",
                                    width: "3.5rem",
                                    height: "100%",
                                }}
                                sx={{ display: { xs: "4rem", md: "flex" }, mr: 1 }}
                            />
                            VALUACIONES SPA
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
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
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={() => {
                                            user.user.type === 'administrator_supervisor' ?
                                            navigation(page.pathSupervisor) :
                                            navigation(page.pathAdmin)
                                        }} >{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                className="logo"
                                style={{
                                    marginLeft: "3.5rem",
                                    width: "3.5rem",
                                    height: "100%",
                                }}
                                sx={{display: {xs: "4rem", md: "flex"}, mr: 1}}
                            />VALUACIONES SPA
                        </Typography>
                        { (user.user.type  === 'administrator_coordinator' || user.user.type === 'administrator_supervisor' ) && (
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                {pages.map((page, index) => (
                                    <Button
                                        key={page+index}
                                        variant="outlined"
                                        onClick={() => {
                                            user.user.type === 'administrator_supervisor' ?
                                                navigation(page.pathSupervisor) :
                                                navigation(page.pathAdmin)
                                        }}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page.name}
                                    </Button>
                                ))}
                            </Box>
                        )}

                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                fontSize: 15,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {user.user.name}
                        </Typography>
                        <Box sx={{ flexGrow: 0 }} >
                            <Button
                                variant="outlined"
                                onClick={() => {handleLogout()}}
                                sx={{my: 2, color: 'white'}}
                                startIcon={<LogoutIcon />}
                                style={{border: "1px solid rgba(255, 255, 255, 0.7)" }}
                            >
                                Cerrar Sesión
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}
