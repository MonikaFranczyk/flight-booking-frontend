import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs, { Dayjs } from "dayjs";

import type { Airport } from "../../types/Airport";
import { getAirports } from "../../api/airportApi";

export default function FlightSearchForm() {

  const navigate = useNavigate();

  const [airports, setAirports] = useState<Airport[]>([]);

  const [departureAirport, setDepartureAirport] =
      useState<Airport | null>(null);

  const [arrivalAirport, setArrivalAirport] =
      useState<Airport | null>(null);

  const [departureDate, setDepartureDate] =
      useState<Dayjs | null>(dayjs());

  const [passengers, setPassengers] =
      useState(1);

  useEffect(() => {

    const loadAirports = async () => {
      try {
        const data = await getAirports();

        console.log("Airports:", data);

        setAirports(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadAirports();

  }, []);

  const handleSearch = () => {

    if (!departureAirport) {
      alert("Please select departure airport.");
      return;
    }

    if (!arrivalAirport) {
      alert("Please select arrival airport.");
      return;
    }

    if (departureAirport.id === arrivalAirport.id) {
      alert("Departure and arrival airport cannot be the same.");
      return;
    }

    if (!departureDate) {
      alert("Please select departure date.");
      return;
    }

    navigate(
        `/flights?from=${departureAirport.id}` +
        `&to=${arrivalAirport.id}` +
        `&date=${departureDate.format("YYYY-MM-DD")}` +
        `&passengers=${passengers}`
    );

  };

  return (

      <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3
          }}
      >

        <Grid container spacing={3}>

          <Grid size={{ xs: 12, md: 6 }}>

            <Autocomplete
                options={airports}
                value={departureAirport}
                onChange={(event, value) =>
                    setDepartureAirport(value)
                }
                getOptionLabel={(option) =>
                    `${option.city} (${option.iataCode})`
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="From"
                    />
                )}
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Autocomplete
                options={airports}
                value={arrivalAirport}
                onChange={(event, value) =>
                    setArrivalAirport(value)
                }
                getOptionLabel={(option) =>
                    `${option.city} (${option.iataCode})`
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="To"
                    />
                )}
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <DatePicker
                label="Departure date"
                value={departureDate}
                onChange={(value) =>
                    setDepartureDate(value)
                }
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
                label="Passengers"
                type="number"
                fullWidth
                value={passengers}
                onChange={(e) =>
                    setPassengers(Number(e.target.value))
                }
                inputProps={{
                  min: 1,
                  max: 9
                }}
            />

          </Grid>

          <Grid size={12}>

            <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSearch}
            >
              Search Flights
            </Button>

          </Grid>

        </Grid>

      </Paper>

  );

}