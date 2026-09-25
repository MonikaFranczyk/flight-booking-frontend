import {
    Box,
    Button,
    Paper,
    Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import hero from "../assets/images/plane1.jpg";

export default function HomePage() {

    const navigate = useNavigate();

    return (

        <Box>

            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundImage: `
            linear-gradient(
                rgba(0,0,0,0.45),
                rgba(0,0,0,0.45)
            ),
            url(${hero})
        `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "fixed",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <Paper
                    elevation={8}
                    sx={{
                        p: 5,
                        width: 700,
                        backgroundColor: "rgba(255,255,255,0.9)",
                        borderRadius: 4
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{
                            textTransform: "uppercase",
                            letterSpacing: 3,
                            color: "#1976d2",
                            fontWeight: 600,
                            textAlign: "center"
                        }}
                    >
                        ✈ Welcome to SkyBook
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            mt: 2,
                            mb: 2
                        }}
                    >
                        Your journey starts here!!!
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            color: "text.secondary",
                            textAlign: "center",
                            mb: 5
                        }}
                    >
                        Search among hundreds of flights worldwide.
                    </Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/search-flights")}
                    >
                        Search Flights

                    </Button>

                </Paper>

            </Box>

        </Box>

    );
}