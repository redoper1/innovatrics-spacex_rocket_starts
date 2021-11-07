import { Link } from "react-router-dom";
import { Typography, Box, Link as MuiLink } from "@mui/material";

export function Error404() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h1"
        sx={{ color: "error.main", textAlign: "center", marginTop: 0 }}
      >
        404 - Not Found!
      </Typography>
      <MuiLink sx={{ mx: "auto" }} component={Link} to="/">
        {"Go back home"}
      </MuiLink>
    </Box>
  );
}
