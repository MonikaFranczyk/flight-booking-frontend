import {
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import type { ReservationPassenger } from "../../types/Reservation";

interface Props {

  index: number;

  passenger: ReservationPassenger;

  onChange: (
      passenger: ReservationPassenger
  ) => void;

}

export default function PassengerForm({
                                        index,
                                        passenger,
                                        onChange
                                      }: Props) {

  const handleChange = (
      field: keyof ReservationPassenger,
      value: string
  ) => {

    onChange({

      ...passenger,

      [field]: value

    });

  };

  return (

      <Paper
          elevation={4}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4
          }}
      >

        <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
        >
          Passenger {index + 1}
        </Typography>

        <Grid
            container
            spacing={3}
        >

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField

                fullWidth

                label="First name"

                value={passenger.firstName}

                onChange={(e) =>
                    handleChange(
                        "firstName",
                        e.target.value
                    )
                }

            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField

                fullWidth

                label="Last name"

                value={passenger.lastName}

                onChange={(e) =>
                    handleChange(
                        "lastName",
                        e.target.value
                    )
                }

            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField

                fullWidth

                type="date"

                label="Birth date"

                InputLabelProps={{
                  shrink: true
                }}

                value={passenger.birthDate}

                onChange={(e) =>
                    handleChange(
                        "birthDate",
                        e.target.value
                    )
                }

            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField

                fullWidth

                label="Passport / ID number"

                value={passenger.documentNumber}

                onChange={(e) =>
                    handleChange(
                        "documentNumber",
                        e.target.value
                    )
                }

            />

          </Grid>

        </Grid>

      </Paper>

  );

}