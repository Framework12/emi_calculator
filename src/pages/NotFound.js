import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Container sx={{ textAlign: "center", mt: 10 }}>
    <Typography variant="h3">Something went wrong</Typography>
    <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
      Go Home
    </Button>
  </Container>
);
export default NotFound;
