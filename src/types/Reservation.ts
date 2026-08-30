export interface ReservationPassenger {

    firstName: string;

    lastName: string;

    birthDate: string;

    documentNumber: string;

}

export interface ReservationRequest {

    flightId: number;

    passengers: ReservationPassenger[];

}