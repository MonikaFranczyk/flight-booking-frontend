import {
    Box,
    Paper,
    Typography
} from "@mui/material";

import FlightSearchForm from "../components/flight/FlightSearchForm";

import hero from "../assets/images/plane1.jpg";

export default function SearchFlightsPage() {

    return (

        <Box
            sx={{
                minHeight: "100vh",

                backgroundImage: `
                    linear-gradient(
                        rgba(0,0,0,.55),
                        rgba(0,0,0,.55)
                    ),
                    url(${hero})
                `,

                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",

                paddingTop: 5,
                paddingBottom: 5,

                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <Paper
                elevation={10}
                sx={{
                    width: 900,

                    p: 5,

                    borderRadius: 5,

                    backgroundColor: "rgba(255,255,255,.92)"
                }}
            >

                <Typography
                    variant="h6"
                    sx={{
                        color: "#1976d2",
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        textAlign: "center",
                        fontWeight: 600
                    }}
                >
                    ✈ Search Flights
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        mt: 2,
                        mb: 2,
                        textAlign: "center"
                    }}
                >
                    Find your perfect journey
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        color: "text.secondary",
                        mb: 5,
                        textAlign: "center"
                    }}
                >
                    Search among hundreds of destinations around the world.
                </Typography>

                <FlightSearchForm/>

            </Paper>

        </Box>

    );

}