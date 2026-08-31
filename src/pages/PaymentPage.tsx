import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex
} from "react-icons/fa";

import hero from "../assets/images/plane1.jpg";

import { getReservation } from "../api/reservationApi";

import {
    createPayment,
    confirmPayment
} from "../api/paymentApi";

import type { Payment } from "../types/Payment";
import type { Reservation } from "../types/Reservation";

export default function PaymentPage() {

    const { reservationId } = useParams();

    const navigate = useNavigate();

    const [reservation, setReservation] = useState<Reservation | null>(null);

    const [payment, setPayment] = useState<Payment | null>(null);

    const [loading, setLoading] = useState(true);

    const [cardHolder, setCardHolder] = useState("");

    const [cardNumber, setCardNumber] = useState("");

    const [expiryDate, setExpiryDate] = useState("");

    const [cvv, setCvv] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {

        const loadData = async () => {

            try {

                const reservationData =
                    await getReservation(Number(reservationId));

                setReservation(reservationData);

                const paymentData =
                    await createPayment(Number(reservationId));

                setPayment(paymentData);

            } catch (e) {

                console.error(e);

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, [reservationId]);

    const handlePayment = async () => {

        if (
            !cardHolder ||
            !cardNumber ||
            !expiryDate ||
            !cvv
        ) {

            setError("Please complete all payment details.");

            return;

        }

        if (!payment) {

            return;

        }

        try {

            await confirmPayment(payment.id);

            navigate("/my-reservations");

        } catch (e) {

            console.error(e);

            setError("Payment failed.");

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

    if (!reservation) {

        return (

            <Container sx={{ mt: 12 }}>

                <Typography variant="h4">

                    Reservation not found

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

            <Container maxWidth="sm">

                <Paper
                    elevation={8}
                    sx={{
                        p: 5,
                        borderRadius: 4
                    }}
                >

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center"
                        }}>
                        Payment
                    </Typography>

                    <Typography
                        sx={{
                            textAlign:"center",
                            color:"text.secondary",
                            mb: 4
                        }}
                    >
                        Complete your booking
                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight:"bold"
                        }}
                    >
                        Flight summary
                    </Typography>

                    <Typography sx={{mt:2}}>
                        Flight: {reservation.flightNumber}
                    </Typography>

                    <Typography>
                        Total: {reservation.totalPrice} PLN
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight:"bold",
                            textAlign:"center",
                            mb:2
                        }}
                    >
                        Accepted cards
                    </Typography>

                    <Stack
                        direction="row"
                        sx={{ mb: 4,
                            spacing: 3,
                            justifyContent:"center"}}
                    >

                        <FaCcVisa size={48} />

                        <FaCcMastercard size={48} />

                        <FaCcAmex size={48} />

                    </Stack>

                    {error && (

                        <Alert
                            severity="error"
                            sx={{ mb: 3 }}
                        >
                            {error}
                        </Alert>

                    )}

                    <Stack spacing={3}>

                        <TextField
                            label="Cardholder name"
                            fullWidth
                            value={cardHolder}
                            onChange={(e) =>
                                setCardHolder(e.target.value)
                            }
                        />

                        <TextField
                            label="Card number"
                            fullWidth
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) =>
                                setCardNumber(e.target.value)
                            }
                        />

                        <Stack
                            direction="row"
                            spacing={2}
                        >

                            <TextField
                                fullWidth
                                label="Expiry date"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) =>
                                    setExpiryDate(e.target.value)
                                }
                            />

                            <TextField
                                fullWidth
                                label="CVV"
                                placeholder="123"
                                value={cvv}
                                onChange={(e) =>
                                    setCvv(e.target.value)
                                }
                            />

                        </Stack>

                        <Button
                            size="large"
                            variant="contained"
                            sx={{
                                py: 1.6,
                                borderRadius: 3
                            }}
                            onClick={handlePayment}
                        >
                            Pay {payment?.amount} PLN
                        </Button>

                    </Stack>

                </Paper>

            </Container>

        </Box>

    );

}