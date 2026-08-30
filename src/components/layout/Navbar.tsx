import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/images/obrazek.png";

export default function Navbar() {

    const navigate = useNavigate();

    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    const buttonStyle = {
        color: "white",
        fontWeight: 600,
        borderRadius: 3,
        px: 2,

        "&:hover": {
            backgroundColor: "rgba(255,255,255,.15)"
        }
    };

    const loginButtonStyle = {
        color: "white",
        border: "1px solid rgba(255,255,255,.5)",
        borderRadius: 30,
        px: 3,

        "&:hover": {
            borderColor: "white",
            backgroundColor: "rgba(255,255,255,.12)"
        }
    };

    const registerButtonStyle = {
        borderRadius: 30,
        px: 3,
        backgroundColor: "#1976d2",

        "&:hover": {
            backgroundColor: "#1565c0"
        }
    };

    return (

        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: "rgba(0,0,0,0.04)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow: "none",
                color: "white"
            }}
        >

            <Toolbar
                sx={{
                    height: 80,
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >

                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "white"
                    }}
                >

                    <Box
                        component="img"
                        src={logo}
                        alt="SkyBook"
                        sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                            transition: ".3s",

                            "&:hover": {
                                transform: "scale(1.08) rotate(-8deg)"
                            }
                        }}
                    />

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: 1
                        }}
                    >
                        SkyBook
                    </Typography>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2
                    }}
                >

                    <Button
                        component={Link}
                        to="/"
                        sx={buttonStyle}
                    >
                        Home
                    </Button>

                    <Button
                        component={Link}
                        to="/search-flights"
                        sx={buttonStyle}
                    >
                        Search Flights
                    </Button>

                    {isAuthenticated && (

                        <Button
                            component={Link}
                            to="/my-reservations"
                            sx={buttonStyle}
                        >
                            My Reservations
                        </Button>

                    )}

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center"
                    }}
                >

                    {isAuthenticated ? (

                        <>

                            <Button
                                component={Link}
                                to="/profile"
                                sx={buttonStyle}
                            >
                                My Account
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleLogout}
                                sx={{
                                    buttonStyle,
                                    borderRadius: 30,
                                    px: 3
                                }}
                            >
                                Logout
                            </Button>

                        </>

                    ) : (

                        <>

                            <Button
                                component={Link}
                                to="/login"
                                sx={loginButtonStyle}
                            >
                                Login
                            </Button>

                            <Button
                                component={Link}
                                to="/register"
                                variant="contained"
                                sx={registerButtonStyle}
                            >
                                Register
                            </Button>

                        </>

                    )}

                </Box>

            </Toolbar>

        </AppBar>

    );

}