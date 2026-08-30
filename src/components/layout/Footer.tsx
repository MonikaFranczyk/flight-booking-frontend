import { Box, Typography } from "@mui/material";

export default function Footer() {

    return (

        <Box
            component="footer"
            sx={{
                width: "100%",
                py: 2,

                background: "rgba(0,0,0,.20)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",

                textAlign: "center",
                color: "white",

                borderTop: "1px solid rgba(255,255,255,.15)"
            }}
        >

            <Typography variant="body2">
                © 2026 SkyBook • All rights reserved
            </Typography>

        </Box>

    );

}