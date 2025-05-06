import { Typography, Container, Box, Button, Divider } from '@mui/material';
import { Launch as LaunchIcon } from '@mui/icons-material';

const About = () => {
  return (
    <Container sx={{ py: 4, maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        About This App
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
        A comprehensive loan calculator application built with React and Material-UI. 
        Features include EMI calculations, amortization schedules, real-time currency 
        conversion, and dark/light mode support.
      </Typography>

      <Box sx={{ 
        p: 3, 
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h6" gutterBottom>
          Live Demo
        </Typography>
        <Typography paragraph color="text.secondary" sx={{ mb: 2 }}>
          Check out the hosted version of this application:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<LaunchIcon />}
          href="https://emi-calculate-git-main-chandanvermas-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textTransform: 'none',
            borderRadius: 1.5,
            px: 3,
            py: 1
          }}
        >
          Visit Live Demo
        </Button>
      </Box>
    </Container>
  );
};

export default About;