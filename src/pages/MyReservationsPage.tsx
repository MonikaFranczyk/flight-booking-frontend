import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Stack,
    Typography
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LuggageIcon from "@mui/icons-material/Luggage";

import hero from "../assets/images/plane1.jpg";

import {
    getMyReservations,
    cancelReservation
} from "../api/reservationApi";

import type { Reservation } from "../types/Reservation";

export default function MyReservationsPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {

        const loadReservations = async () => {

            try {

                const data = await getMyReservations();

                setReservations(data);

            } catch (e) {

                console.error(e);

            } finally {

                setLoading(false);

            }

        };

        loadReservations();

    }, []);

    const getStatusColor = (status: string) => {

        switch (status) {

            case "PAID":
                return "success";

            case "PENDING":
                return "warning";

            case "CANCELLED":
                return "error";

            default:
                return "default";

        }

    };

    const handleCancel = async (reservationId: number) => {
        try {
            await cancelReservation(reservationId);

            setReservations((current) =>
                current.map((reservation) =>
                    reservation.id === reservationId
                        ? {
                            ...reservation,
                            status: "CANCELLED"
                        }
                        : reservation
                )
            );

        } catch (error) {
            console.error("Failed to cancel reservation:", error);
        }
    };

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 20
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

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
                py: 8
            }}
        >
            <Container maxWidth="lg">

                <Box sx={{ mb: 5 }}>
                </Box>

                {reservations.length === 0 ? (

                    <Card
                        sx={{
                            p: 6,
                            borderRadius: 4,
                            textAlign: "center",
                            background: "#fff",
                            boxShadow: "0 8px 30px rgba(23, 35, 60, 0.08)"
                        }}
                    >
                        <FlightTakeoffIcon
                            sx={{
                                fontSize: 70,
                                color: "primary.main",
                                mb: 2
                            }}
                        />

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold"
                            }}
                        >
                            No reservations found
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 2,
                                mb: 4
                            }}
                        >
                            You haven't booked any flights yet.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/search-flights")}
                            sx={{
                                borderRadius: 2,
                                px: 4,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            Search Flights
                        </Button>
                    </Card>

                ) : (

                    <Stack spacing={3}>

                        {reservations.map((reservation) => (

                            <Card
                                key={reservation.id}
                                sx={{
                                    borderRadius: 4,
                                    background: "#fff",
                                    boxShadow:
                                        "0 8px 30px rgba(23, 35, 60, 0.08)",
                                    transition: "all .2s ease",
                                    overflow: "hidden",

                                    "&:hover": {
                                        boxShadow:
                                            "0 14px 40px rgba(23, 35, 60, 0.14)",
                                        transform: "translateY(-2px)"
                                    }
                                }}
                            >

                                <CardContent
                                    sx={{
                                        p: 0,
                                        "&:last-child": {
                                            pb: 0
                                        }
                                    }}
                                >

                                    <Stack
                                        direction={{
                                            xs: "column",
                                            md: "row"
                                        }}
                                    >

                                        {/* ================= LEFT SIDE ================= */}
                                        <Box
                                            sx={{
                                                flex: 1,
                                                p: {
                                                    xs: 3,
                                                    md: 4
                                                }
                                            }}
                                        >

                                            {/* FLIGHT NUMBER + RESERVATION */}
                                            <Stack
                                                direction="row"
                                                sx={{ mb: 3,
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                            }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: "text.secondary",
                                                            mb: 0.5
                                                        }}
                                                    >
                                                        Flight
                                                    </Typography>

                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: "#17233c"
                                                        }}
                                                    >
                                                        {reservation.flightNumber}
                                                    </Typography>
                                                </Box>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "text.secondary"
                                                    }}
                                                >
                                                    Reservation #
                                                    {reservation.reservationNumber}
                                                </Typography>
                                            </Stack>


                                            {/* ROUTE */}
                                            <Stack
                                                direction="row"
                                                sx={{
                                                    mb: 3,
                                                    alignItems: "center",
                                                    spacing: 2
                                                }}
                                            >

                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            color: "#17233c",
                                                            fontWeight: 800
                                                        }}
                                                    >
                                                        {reservation.departureAirport}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Departure
                                                    </Typography>
                                                </Box>


                                                {/* PLANE ICON */}
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        minWidth: 60,
                                                        height: 60,
                                                        borderRadius: "50%",
                                                        background:
                                                            "rgba(25, 118, 210, 0.08)"
                                                    }}
                                                >
                                                    <FlightTakeoffIcon
                                                        sx={{
                                                            fontSize: 30,
                                                            color: "primary.main"
                                                        }}
                                                    />
                                                </Box>


                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                        textAlign: "right"
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: 800,
                                                            color: "#17233c"
                                                        }}
                                                    >
                                                        {reservation.arrivalAirport}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Arrival
                                                    </Typography>
                                                </Box>

                                            </Stack>


                                            {/* DIVIDER */}
                                            <Box
                                                sx={{
                                                    height: "1px",
                                                    background:
                                                        "#e5e9f0",
                                                    mb: 3
                                                }}
                                            />


                                            {/* BOTTOM INFORMATION */}
                                            <Stack
                                                direction={{
                                                    xs: "column",
                                                    sm: "row"
                                                }}
                                                spacing={{
                                                    xs: 1.5,
                                                    sm: 4
                                                }}
                                            >

                                                <Stack
                                                    sx={{
                                                        direction:"row",
                                                        spacing: 1,
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <LuggageIcon
                                                        sx={{
                                                            fontSize: 21,
                                                            color: "text.secondary"
                                                        }}
                                                    />

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {reservation.passengers.length}{" "}
                                                        passenger
                                                        {reservation.passengers.length !== 1
                                                            ? "s"
                                                            : ""}
                                                    </Typography>
                                                </Stack>


                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Flight {reservation.flightNumber}
                                                </Typography>

                                            </Stack>

                                        </Box>


                                        {/* ================= RIGHT SIDE ================= */}
                                        <Box
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    md: 280
                                                },
                                                borderLeft: {
                                                    xs: "none",
                                                    md: "1px dashed #d9dee8"
                                                },
                                                borderTop: {
                                                    xs: "1px dashed #d9dee8",
                                                    md: "none"
                                                },
                                                p: {
                                                    xs: 3,
                                                    md: 4
                                                },
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center"
                                            }}
                                        >

                                            {/* STATUS */}
                                            <Chip
                                                label={reservation.status}
                                                color={getStatusColor(
                                                    reservation.status
                                                )}
                                                size="small"
                                                sx={{
                                                    alignSelf: "flex-start",
                                                    mb: 2,
                                                    fontWeight: 700,
                                                    borderRadius: 1.5
                                                }}
                                            />


                                            {/* PRICE */}
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mb: 0.5 }}
                                            >
                                                Total Price
                                            </Typography>

                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    fontWeight: 800,
                                                    color: "primary.main",
                                                    mb: 3
                                                }}
                                            >
                                                {reservation.totalPrice} PLN
                                            </Typography>

                                            {/* DETAILS */}

                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() =>
                                                    navigate(
                                                        `/reservation/${reservation.id}`
                                                    )
                                                }
                                                sx={{
                                                    mb: 1.5,
                                                    borderRadius: 2,
                                                    textTransform: "none",
                                                    fontWeight: 600,
                                                    py: 1
                                                }}
                                            >
                                                Details
                                            </Button>


                                            {/* PAY */}

                                            {reservation.status === "PENDING" && (
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() =>
                                                        navigate(
                                                            `/payment/${reservation.id}`
                                                        )
                                                    }
                                                    sx={{
                                                        mb: 1.5,
                                                        borderRadius: 2,
                                                        textTransform: "none",
                                                        fontWeight: 600,
                                                        py: 1
                                                    }}
                                                >
                                                    Pay Now
                                                </Button>
                                            )}


                                            {/* CANCEL */}

                                            {reservation.status !== "CANCELLED" && (
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    fullWidth
                                                    onClick={() =>
                                                        handleCancel(reservation.id)
                                                    }
                                                    sx={{
                                                        borderRadius: 2,
                                                        textTransform: "none",
                                                        fontWeight: 600,
                                                        py: 1
                                                    }}
                                                >
                                                    Cancel Reservation
                                                </Button>
                                            )}

                                        </Box>

                                    </Stack>

                                </CardContent>

                            </Card>

                        ))}

                    </Stack>

                )}

            </Container>
        </Box>
    );

}