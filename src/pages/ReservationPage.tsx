import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
    Box,
    CircularProgress,
    Container,
    Grid
} from "@mui/material";

import hero from "../assets/images/plane1.jpg";

import { getFlight } from "../api/flightApi";
import { createReservation } from "../api/reservationApi";

import type { Flight } from "../types/Flight";
import type {
    ReservationPassenger,
    ReservationRequest
} from "../types/Reservation";

import FlightSummaryCard from "../components/reservation/FlightSummaryCard";
import PassengerForm from "../components/reservation/PassengerForm";
import ReservationSummary from "../components/reservation/ReservationSummary";

export default function ReservationPage() {

    const { flightId } = useParams();

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const passengersCount =
        Number(searchParams.get("passengers")) || 1;

    const [flight, setFlight] = useState<Flight | null>(null);

    const [loading, setLoading] = useState(true);

    const [passengers, setPassengers] =
        useState<ReservationPassenger[]>([]);

    useEffect(() => {

        const loadFlight = async () => {

            try {

                const data = await getFlight(Number(flightId));

                setFlight(data);

                setPassengers(

                    Array.from(
                        { length: passengersCount },
                        () => ({
                            firstName: "",
                            lastName: "",
                            birthDate: "",
                            documentNumber: ""
                        })
                    )

                );

            } catch (e) {

                console.error(e);

            } finally {

                setLoading(false);

            }

        };

        loadFlight();

    }, [flightId, passengersCount]);

    const updatePassenger = (
        index: number,
        passenger: ReservationPassenger
    ) => {

        const updated = [...passengers];

        updated[index] = passenger;

        setPassengers(updated);

    };

    const handleReservation = async () => {

        if (!flight) return;

        const request: ReservationRequest = {

            flightId: flight.id,

            passengers

        };

        try {

            const reservation =
                await createReservation(request);
            navigate(`/payment/${reservation.id}`
            );

        } catch (e) {

            console.error(e);

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

    if (!flight) {

        return null;

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

            <Container maxWidth="xl">

                <Grid
                    container
                    spacing={4}
                >

                    <Grid size={{ xs: 12, lg: 8 }}>

                        <FlightSummaryCard
                            flight={flight}
                        />

                        {passengers.map((passenger, index) => (

                            <PassengerForm

                                key={index}

                                index={index}

                                passenger={passenger}

                                onChange={(value) =>
                                    updatePassenger(
                                        index,
                                        value
                                    )
                                }

                            />

                        ))}

                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }}>

                        <ReservationSummary

                            passengers={passengers.length}

                            price={flight.price}

                            onConfirm={handleReservation}

                        />

                    </Grid>

                </Grid>

            </Container>

        </Box>

    );

}