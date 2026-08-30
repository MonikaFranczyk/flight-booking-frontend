import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    Box,
    CircularProgress,
    Container
} from "@mui/material";

import { searchFlights } from "../api/flightApi";

import type { Flight } from "../types/Flight";

import FlightList from "../components/flight/FlightList";
import FlightFilters from "../components/flight/FlightFilters";

import hero from "../assets/images/plane1.jpg";

export default function FlightsPage() {

    const [searchParams] = useSearchParams();
    const passengers =
        Number(searchParams.get("passengers")) || 1;

    const [loading, setLoading] = useState(true);
    const [flights, setFlights] = useState<Flight[]>([]);

    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [directOnly, setDirectOnly] = useState(false);

    useEffect(() => {

        const loadFlights = async () => {

            try {

                const data = await searchFlights({

                    departureAirportId: Number(searchParams.get("from")),

                    arrivalAirportId: Number(searchParams.get("to")),

                    departureDate: searchParams.get("date")!,

                    passengers: Number(searchParams.get("passengers"))

                });

                setFlights(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadFlights();

    }, [searchParams]);

    const airlines = [...new Set(flights.map(f => f.airline))];

    const filteredFlights = flights.filter((flight) => {

        const airlineMatch =
            selectedAirlines.length === 0 ||
            selectedAirlines.includes(flight.airline);

        const priceMatch =
            flight.price <= maxPrice;

        // Na razie wszystkie loty są bezpośrednie
        const directMatch =
            !directOnly || true;

        return airlineMatch && priceMatch && directMatch;

    });

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh"
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

                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

                py: 4
            }}
        >

            <Container
                sx={{
                    pt: 10
                }}
            >

                <FlightFilters

                    airlines={airlines}

                    selectedAirlines={selectedAirlines}

                    onSelectedAirlinesChange={setSelectedAirlines}

                    maxPrice={maxPrice}

                    onMaxPriceChange={setMaxPrice}

                    directOnly={directOnly}

                    onDirectOnlyChange={setDirectOnly}

                />

                <Box sx={{ mt: 3 }}>

                    <FlightList
                        flights={filteredFlights}
                        passengers={passengers}
                    />

                </Box>

            </Container>

        </Box>

    );

}