import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Paper,
    Slider,
    Stack,
    Typography
} from "@mui/material";

interface FlightFiltersProps {
    airlines: string[];

    selectedAirlines: string[];

    onSelectedAirlinesChange: (airlines: string[]) => void;

    maxPrice: number;

    onMaxPriceChange: (price: number) => void;

    directOnly: boolean;

    onDirectOnlyChange: (value: boolean) => void;
}

export default function FlightFilters({
                                          airlines,
                                          selectedAirlines,
                                          onSelectedAirlinesChange,
                                          maxPrice,
                                          onMaxPriceChange,
                                          directOnly,
                                          onDirectOnlyChange
                                      }: FlightFiltersProps) {

    const handleAirlineChange = (
        airline: string,
        checked: boolean
    ) => {

        if (checked) {

            onSelectedAirlinesChange([
                ...selectedAirlines,
                airline
            ]);

        } else {

            onSelectedAirlinesChange(
                selectedAirlines.filter(a => a !== airline)
            );

        }

    };

    return (

        <Paper
            elevation={1}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 4,
                maxWidth: 1200,
                mx: "auto"
            }}
        >

            <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",
                    mb: 3
                }}
            >
                Filters
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 600,
                    mb: 2
                }}
            >
                Airlines
            </Typography>

            <Stack
                useFlexGap
                sx={{
                    flexWrap:"wrap",
                    direction:"row",
                    spacing:2
                }}
            >
                {airlines.map((airline) => (
                    <FormControlLabel
                        key={airline}
                        label={airline}
                        control={
                            <Checkbox
                                checked={selectedAirlines.includes(airline)}
                                onChange={(e) =>
                                    handleAirlineChange(
                                        airline,
                                        e.target.checked
                                    )
                                }
                            />
                        }
                    />
                ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight:600,
                    mb:2
                }}
            >
                Maximum price: {maxPrice} PLN
            </Typography>

            <Slider
                value={maxPrice}
                min={100}
                max={2000}
                step={50}
                valueLabelDisplay="auto"
                onChange={(_, value) =>
                    onMaxPriceChange(value as number)
                }
            />

            <Divider sx={{ my: 3 }} />

            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 600,
                    mb: 1
                }}
            >
                Stops
            </Typography>

            <Box sx={{
                    display:"flex",
                    justifyContent:"flex-start"
            }}
                >
                <FormControlLabel
                    label="Direct flights only"
                    control={
                        <Checkbox
                            checked={directOnly}
                            onChange={(e) =>
                                onDirectOnlyChange(e.target.checked)
                            }
                        />
                    }
                />
            </Box>

        </Paper>

    );
}