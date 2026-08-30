import { useState } from "react";
import {
    Link,
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

import { register } from "../api/authApi";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        setError("");
        setLoading(true);

        try {

            await register({
                firstName,
                lastName,
                email,
                password
            });

            navigate("/login");

        } catch {

            setError("Registration failed. Please try again.");

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
                    textAlign="center"
                    fontWeight="bold"
                >
                    Create account
                </Typography>

                <Typography
                    textAlign="center"
                    color="text.secondary"
                    mb={4}
                >
                    Register for SkyBook
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
                        label="First name"
                        fullWidth
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                    />

                    <TextField
                        label="Last name"
                        fullWidth
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                    />

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
                        onClick={handleRegister}
                        sx={{
                            py: 1.4,
                            borderRadius: 3
                        }}
                    >
                        Register
                    </Button>

                </Stack>

                <Typography
                    mt={4}
                    textAlign="center"
                >
                    Already have an account?{" "}

                    <Button
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>

                </Typography>

            </Paper>

        </Box>
    );
}