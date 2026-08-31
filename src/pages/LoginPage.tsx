import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import hero from "../assets/images/plane1.jpg";

import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {

    const navigate = useNavigate();

    const location = useLocation();
    console.log("LOCATION STATE:", location.state);

    const { login: saveToken } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        setError("");

        setLoading(true);

        try {

            const response = await login({

                email,

                password

            });

            saveToken(response.accessToken);

            navigate(

                location.state?.redirectTo ?? "/"

            );

        } catch {

            setError("Invalid email or password.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box
            sx={{
                minHeight: "100vh",

                backgroundImage: `
                    linear-gradient(
                        rgba(0,0,0,.45),
                        rgba(0,0,0,.45)
                    ),
                    url(${hero})
                `,

                backgroundSize: "cover",
                backgroundPosition: "center",

                display: "flex",

                justifyContent: "center",

                alignItems: "center"
            }}
        >

            <Paper
                elevation={10}
                sx={{
                    width: 450,

                    p: 5,

                    borderRadius: 5
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold"
                    }}
                >
                    Welcome back
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        color:"text.secondary",
                        mb: 4
                    }}
                >
                    Sign in to SkyBook
                </Typography>

                {error && (

                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                    >
                        {error}
                    </Alert>

                )}

                <Stack spacing={3}>

                    <TextField

                        label="Email"

                        type="email"

                        fullWidth

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                    />

                    <TextField

                        label="Password"

                        type="password"

                        fullWidth

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }

                    />

                    <Button

                        variant="contained"

                        size="large"

                        disabled={loading}

                        onClick={handleLogin}

                        sx={{
                            py: 1.4,

                            borderRadius: 3
                        }}

                    >

                        Login

                    </Button>

                </Stack>

                <Typography
                    sx={{
                        mt: 4,
                        textAlign: "center"
                    }}
                >

                    Don't have an account?{" "}

                    <Button
                        component={Link}
                        to="/register"
                    >
                        Register
                    </Button>

                </Typography>

            </Paper>

        </Box>

    );

}