export interface ReservationPassenger {
    firstName: string;
    lastName: string;
    birthDate: string;
    documentNumber: string;
}

export interface ReservationPassengerResponse {
    id?: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    documentNumber: string;
}

export interface ReservationRequest {
    flightId: number;
    passengers: ReservationPassenger[];
}

export interface Reservation {
    id: number;
    reservationNumber: string;
    reservationDate: string;
    status: string;
    totalPrice: number;

    flightNumber: string;

    departureAirport: string;
    arrivalAirport: string;

    airlineName: string;

    departureTime: string;
    arrivalTime: string;

    passengers: ReservationPassengerResponse[];
}