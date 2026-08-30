import { Alert, Stack } from "@mui/material";

import type { Flight } from "../../types/Flight";

import FlightCard from "./FlightCard";

interface FlightListProps {
    flights: Flight[];
    passengers: number;
}

export default function FlightList({
                                       flights,
                                       passengers
                                   }: FlightListProps) {

    if (flights.length === 0) {
        return (
            <Alert
                severity="info"
                sx={{
                    borderRadius: 3,
                    mt: 2
                }}
            >
                No flights found matching the selected criteria.
            </Alert>
        );
    }

    return (
        <Stack spacing={3}>
            {flights.map((flight) => (
                <FlightCard
                    key={flight.id}
                    flight={flight}
                    passengers={passengers}
                />
            ))}
        </Stack>
    );
}