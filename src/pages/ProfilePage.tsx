import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import hero from "../assets/images/plane1.jpg";

interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch("http://localhost:8080/api/users/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data: UserResponse = await response.json();
                setUser(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    if (loading) {
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
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ color: "#fff", fontWeight: 700 }}
                >
                    Loading profile...
                </Typography>
            </Box>
        );
    }

    if (error || !user) {
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
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ color: "#fff", fontWeight: 700 }}
                >
                    {error || "User data not found."}
                </Typography>
            </Box>
        );
    }

    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;

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
                py: 8,
            }}
        >
            <Container maxWidth="lg">

                {/* HEADER */}
                <Box sx={{ mb: 5 }}>
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{
                            color: "#fff",
                            mb: 1,
                        }}
                    >
                    </Typography>

                    <Typography
                        sx={{
                            color: "rgba(255,255,255,.85)",
                            fontSize: "1.05rem",
                        }}
                    >
                    </Typography>
                </Box>

                {/* PROFILE CARD */}
                <Card
                    sx={{
                        borderRadius: 4,
                        background: "#fff",
                        boxShadow: "0 14px 40px rgba(23, 35, 60, 0.18)",
                        overflow: "hidden",
                    }}
                >
                    <CardContent sx={{ p: 0 }}>

                        <Stack
                            direction={{
                                xs: "column",
                                md: "row",
                            }}
                        >

                            {/* LEFT SIDE */}
                            <Box
                                sx={{
                                    width: {
                                        xs: "100%",
                                        md: 320,
                                    },
                                    p: {
                                        xs: 4,
                                        md: 5,
                                    },
                                    background:
                                        "linear-gradient(180deg, #f7f9fc 0%, #ffffff 100%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                }}
                            >

                                {/* AVATAR */}
                                <Box
                                    sx={{
                                        width: 110,
                                        height: 110,
                                        borderRadius: "50%",
                                        background:
                                            "rgba(25, 118, 210, 0.10)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 42,
                                            fontWeight: 800,
                                            color: "primary.main",
                                        }}
                                    >
                                        {firstName.charAt(0).toUpperCase()}
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="h5"
                                    fontWeight={800}
                                    sx={{
                                        color: "#17233c",
                                        mb: 0.5,
                                    }}
                                >
                                    {firstName} {lastName}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {email}
                                </Typography>

                            </Box>

                            {/* VERTICAL DIVIDER */}
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    display: {
                                        xs: "none",
                                        md: "block",
                                    },
                                }}
                            />

                            {/* HORIZONTAL DIVIDER */}
                            <Divider
                                sx={{
                                    display: {
                                        xs: "block",
                                        md: "none",
                                    },
                                }}
                            />

                            {/* RIGHT SIDE */}
                            <Box
                                sx={{
                                    flex: 1,
                                    p: {
                                        xs: 3,
                                        md: 5,
                                    },
                                }}
                            >

                                <Typography
                                    variant="h5"
                                    fontWeight={800}
                                    sx={{
                                        color: "#17233c",
                                        mb: 1,
                                    }}
                                >
                                    Personal Information
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{ mb: 4 }}
                                >
                                    Your account details
                                </Typography>

                                <Stack spacing={3}>

                                    {/* FIRST NAME */}
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 0.5 }}
                                        >
                                            First Name
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                            sx={{
                                                color: "#17233c",
                                            }}
                                        >
                                            {firstName}
                                        </Typography>
                                    </Box>

                                    {/* LAST NAME */}
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 0.5 }}
                                        >
                                            Last Name
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                            sx={{
                                                color: "#17233c",
                                            }}
                                        >
                                            {lastName}
                                        </Typography>
                                    </Box>

                                    {/* EMAIL */}
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 0.5 }}
                                        >
                                            Email
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                            sx={{
                                                color: "#17233c",
                                                wordBreak: "break-word",
                                            }}
                                        >
                                            {email}
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ my: 1 }} />

                                    {/* SECURITY */}
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            sx={{
                                                color: "#17233c",
                                                mb: 0.5,
                                            }}
                                        >
                                            Security
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Your account is protected by your
                                            login credentials.
                                        </Typography>
                                    </Box>

                                </Stack>

                            </Box>

                        </Stack>

                    </CardContent>
                </Card>

            </Container>
        </Box>
    );
}