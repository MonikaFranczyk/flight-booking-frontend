import { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import {
    useNavigate,
    useParams,
    useSearchParams
} from "react-router-dom";

import LuggageIcon from "@mui/icons-material/Luggage";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

import hero from "../assets/images/plane1.jpg";

import { getFlight } from "../api/flightApi";
import { useAuth } from "../context/AuthContext";

import type { Flight } from "../types/Flight";

export default function FlightDetailsPage() {

    const { flightId } = useParams();

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    const [flight, setFlight] = useState<Flight | null>(null);

    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    const passengers =
        Number(searchParams.get("passengers")) || 1;

    useEffect(() => {

        const loadFlight = async () => {

            try {

                const data = await getFlight(Number(flightId));

                setFlight(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadFlight();

    }, [flightId]);

    const handleBookFlight = () => {

        if (!isAuthenticated) {
            if (!flight) {
                return;
            }

            navigate("/login", {
                state: {
                    redirectTo: `/reservation/${flight.id}?passengers=${passengers}`
                }
            });

            return;

        }

        navigate(
            `/reservation/${flightId}?passengers=${passengers}`
        );

    };

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "60vh"
                }}
            >
                <CircularProgress />
            </Box>

        );

    }

    if (!flight) {

        return (

            <Container sx={{ mt: 12 }}>

                <Typography variant="h4">
                    Flight not found
                </Typography>

            </Container>

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

                backgroundSize: "cover",
                backgroundPosition: "center",

                py: 12
            }}
        >

            <Container maxWidth="md">

                <Paper
                    sx={{
                        p: 5,
                        borderRadius: 4
                    }}
                >

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight:"bold",
                            mb: 4}}
                    >
                        Flight Details
                    </Typography>

                    <Stack
                        direction="row"
                        sx={{
                        justifyContent:"space-between",
                        alignItems:"center"}}
                    >

                        <Typography variant="h5">
                            {flight.departureAirport}
                        </Typography>

                        <FlightTakeoffIcon color="primary" />

                        <Typography variant="h5">
                            {flight.arrivalAirport}
                        </Typography>

                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <Typography>
                        Airline: {flight.airline}
                    </Typography>

                    <Typography>
                        Flight number: {flight.flightNumber}
                    </Typography>

                    <Typography>
                        Departure: {new Date(flight.departureTime).toLocaleString()}
                    </Typography>

                    <Typography>
                        Arrival: {new Date(flight.arrivalTime).toLocaleString()}
                    </Typography>

                    <Typography>
                        Available seats: {flight.availableSeats}
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography
                        variant="h5"
                        sx={{mb: 2}}
                    >
                        <LuggageIcon sx={{ mr: 1 }} />
                        Included baggage
                    </Typography>

                    <Typography sx={{mb: 2}}>✔ Personal item</Typography>

                    <Typography>✔ Cabin baggage (8 kg)</Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography
                        variant="h3"
                        sx={{
                            color:"primary",
                            fontWeight:"bold"}}

                    >
                        {flight.price} PLN
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mb: 2 }}
                    >

                        <Button
                            startIcon={<ArrowBackIcon />}
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            sx={{
                                borderRadius: 3,
                                px: 3,
                                py: 1.6
                            }}
                        >
                            Back to search results
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleBookFlight}
                            sx={{
                                flex: 1,
                                py: 1.6,
                                borderRadius: 3
                            }}
                        >
                            Book Flight
                        </Button>

                    </Stack>


                </Paper>

            </Container>

        </Box>

    );

}