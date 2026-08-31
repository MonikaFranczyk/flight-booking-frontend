import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import hero from "../assets/images/plane1.jpg";

export default function NotFoundPage() {
    const navigate = useNavigate();

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
                backgroundAttachment: "fixed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        borderRadius: 4,
                        background: "#fff",
                        boxShadow: "0 14px 40px rgba(23, 35, 60, 0.18)",
                        textAlign: "center",
                    }}
                >
                    <CardContent sx={{ p: { xs: 4, md: 6 } }}>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "5rem",
                                    md: "7rem",
                                },
                                lineHeight: 1,
                                fontWeight: 900,
                                color: "primary.main",
                                mb: 2,
                            }}
                        >
                            404
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: "#17233c",
                                mb: 1.5,
                            }}
                        >
                            Page not found
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                fontSize: "1.05rem",
                                mb: 4,
                            }}
                        >
                            Sorry, the page you are looking for does not exist
                            or may have been moved.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/")}
                            sx={{
                                borderRadius: 2,
                                px: 4,
                                py: 1.3,
                                fontWeight: 700,
                                textTransform: "none",
                            }}
                        >
                            Back to Home
                        </Button>

                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}