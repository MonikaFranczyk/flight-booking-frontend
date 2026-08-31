import {
    Card,
    CardContent,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

import type { Flight } from "../../types/Flight";

interface Props {
    flight: Flight;
}

export default function FlightSummaryCard({ flight }: Props) {

    const departure = new Date(flight.departureTime);

    const arrival = new Date(flight.arrivalTime);

    const departureTime = departure.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const arrivalTime = arrival.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const departureDate = departure.toLocaleDateString();

    const durationMs = arrival.getTime() - departure.getTime();

    const hours = Math.floor(durationMs / 1000 / 60 / 60);

    const minutes = Math.floor((durationMs / 1000 / 60) % 60);

    return (

        <Card
            elevation={8}
            sx={{
                borderRadius: 4,
                mb: 4
            }}
        >

            <CardContent sx={{ p: 4 }}>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight:"bold",
                        mb: 3
                    }}
                >
                    Flight summary
                </Typography>

                <Stack
                    sx={{
                        direction:"row",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}
                >

                    <Typography variant="h4">
                        {departureTime}
                    </Typography>

                    <FlightTakeoffIcon
                        color="primary"
                        sx={{ fontSize: 28 }}
                    />

                    <Typography variant="h4">
                        {arrivalTime}
                    </Typography>

                </Stack>

                <Stack
                    sx={{
                        direction:"row",
                        justifyContent:"space-between",
                        mt:2
                    }}
                >

                    <Typography variant="h6">
                        {flight.departureAirport}
                    </Typography>

                    <Typography variant="h6">
                        {flight.arrivalAirport}
                    </Typography>

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography>
                    <strong>Airline:</strong> {flight.airline}
                </Typography>

                <Typography>
                    <strong>Flight:</strong> {flight.flightNumber}
                </Typography>

                <Typography>
                    <strong>Date:</strong> {departureDate}
                </Typography>

                <Typography>
                    <strong>Duration:</strong> {hours} h {minutes} min
                </Typography>

                <Typography>
                    <strong>Available seats:</strong> {flight.availableSeats}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h4"
                    sx={{
                        color:"primary",
                        fontWeight:"bold",
                        textAlign:"right"
                    }}
                >
                    {flight.price} PLN
                </Typography>

            </CardContent>

        </Card>

    );

}