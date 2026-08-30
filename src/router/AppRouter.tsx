import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import SearchFlightsPage from "../pages/SearchFlightsPage";
import FlightsPage from "../pages/FlightsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ReservationPage from "../pages/ReservationPage";
import PaymentPage from "../pages/PaymentPage";
import MyReservationsPage from "../pages/MyReservationsPage";
import MyTicketsPage from "../pages/MyTicketsPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import FlightDetailsPage from "../pages/FlightDetailsPage.tsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route element={<MainLayout />}>

                    <Route
                        path="/search-flights"
                        element={<SearchFlightsPage />}
                    />

                    <Route
                        path="/flights"
                        element={<FlightsPage />}
                    />

                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />

                    <Route
                        path="/reservation/:flightId"
                        element={<ReservationPage />}
                    />

                    <Route
                        path="/payment/:reservationId"
                        element={<PaymentPage />}
                    />

                    <Route
                        path="/my-reservations"
                        element={<MyReservationsPage />}
                    />

                    <Route
                        path="/my-tickets"
                        element={<MyTicketsPage />}
                    />

                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                    />

                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />

                    <Route
                        path="/flights/:flightId"
                        element={<FlightDetailsPage />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}