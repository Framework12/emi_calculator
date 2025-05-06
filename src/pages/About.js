import { Typography, Container } from '@mui/material';

const About = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        About This App
      </Typography>
      <Typography paragraph>
        A React-based loan calculator with EMI calculations, currency conversion, 
        and dark/light mode support.
      </Typography>
    </Container>
  );
};

export default About;