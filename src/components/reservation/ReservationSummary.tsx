import {
    Button,
    Divider,
    Paper,
    Typography
} from "@mui/material";

interface Props {

    passengers: number;

    price: number;

    onConfirm: () => void;

}

export default function ReservationSummary({
                                               passengers,
                                               price,
                                               onConfirm
                                           }: Props) {

    const total = passengers * price;

    return (

        <Paper
            elevation={8}
            sx={{
                p: 3,
                borderRadius: 4,
                position: "sticky",
                top: 100
            }}
        >

            <Typography
                variant="h5"
                sx={{
                    fontWeight:"bold",
                    mb:2
                }}
            >
                Reservation summary
            </Typography>

            <Typography>
                Passengers
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    mb:2
                }}
            >
                {passengers}
            </Typography>

            <Typography>
                Price per passenger
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    mb:2
                }}
            >
                {price} PLN
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography
                variant="h5"
                sx={{
                    fontWeight:"bold"
                }}
            >
                Total
            </Typography>

            <Typography
                variant="h3"
                sx={{
                    color:"primary",
                    fontWeight:"bold",
                    mb:4
                }}
            >
                {total} PLN
            </Typography>

            <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{
                    py: 1.6,
                    borderRadius: 3
                }}
                onClick={onConfirm}
            >
                Confirm reservation
            </Button>

        </Paper>

    );

}