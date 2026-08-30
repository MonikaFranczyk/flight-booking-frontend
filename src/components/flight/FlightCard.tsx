import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import type { Flight } from "../../types/Flight";

interface Props {
    flight: Flight;
}

export default function FlightCard({ flight }: Props) {

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    const [searchParams] = useSearchParams();

    const passengers =
        Number(searchParams.get("passengers")) || 1;


    const departureTime = new Date(
        flight.departureTime
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });


    const arrivalTime = new Date(
        flight.arrivalTime
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });


    const handleBookFlight = () => {

        if (!isAuthenticated) {

            navigate("/login", {
                state: {
                    redirectTo:
                        `/reservation/${flight.id}?passengers=${passengers}`
                }
            });

            return;
        }

        navigate(
            `/reservation/${flight.id}?passengers=${passengers}`
        );

    };


    const handleDetails = () => {

        navigate(
            `/flights/${flight.id}?passengers=${passengers}`
        );

    };


    return (

        <Card
            sx={{
                mb: 3,
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

                        {/* FLIGHT NUMBER + AIRLINE */}

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 3 }}
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
                                    fontWeight={700}
                                    sx={{
                                        color: "#17233c"
                                    }}
                                >
                                    {flight.flightNumber}
                                </Typography>

                            </Box>


                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary"
                                }}
                            >
                                {flight.airlineName}
                            </Typography>

                        </Stack>


                        {/* ================= ROUTE ================= */}

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            sx={{
                                mb: 3
                            }}
                        >

                            {/* DEPARTURE */}

                            <Box sx={{ flex: 1 }}>

                                <Typography
                                    variant="h5"
                                    fontWeight={800}
                                    sx={{
                                        color: "#17233c"
                                    }}
                                >
                                    {departureTime}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {flight.departureAirport}
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


                            {/* ARRIVAL */}

                            <Box
                                sx={{
                                    flex: 1,
                                    textAlign: "right"
                                }}
                            >

                                <Typography
                                    variant="h5"
                                    fontWeight={800}
                                    sx={{
                                        color: "#17233c"
                                    }}
                                >
                                    {arrivalTime}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {flight.arrivalAirport}
                                </Typography>

                            </Box>

                        </Stack>


                        {/* DIVIDER */}

                        <Divider sx={{ mb: 3 }} />


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

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Airline: {flight.airlineName}
                            </Typography>


                            <Typography
                                variant="body2"
                                color="success.main"
                                fontWeight={600}
                            >
                                {flight.availableSeats} seats available
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

                        {/* PRICE */}

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                        >
                            Price per passenger
                        </Typography>


                        <Typography
                            variant="h5"
                            fontWeight={800}
                            sx={{
                                color: "primary.main",
                                mb: 3
                            }}
                        >
                            {flight.price} PLN
                        </Typography>


                        {/* DETAILS */}

                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleDetails}
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


                        {/* BOOK */}

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleBookFlight}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                py: 1
                            }}
                        >
                            Book Flight
                        </Button>

                    </Box>

                </Stack>

            </CardContent>

        </Card>

    );

}