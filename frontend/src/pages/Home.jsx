import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Making Sustainability Affordable
          </Typography>
          <Typography variant="h5" paragraph>
            While Saving Nature, One Bag at a Time
          </Typography>
          <Button
            component={RouterLink}
            to="/shop"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2 }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Why Choose CarryKaro?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Eco-Friendly
                </Typography>
                <Typography>
                  Our bags are made from sustainable materials, reducing plastic waste
                  and environmental impact.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Affordable
                </Typography>
                <Typography>
                  Get high-quality bags at competitive prices through our innovative
                  ad-sponsored model.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Durable
                </Typography>
                <Typography>
                  Built to last, our bags can be reused multiple times, providing
                  better value for your money.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Join the Sustainability Movement
          </Typography>
          <Typography variant="h6" paragraph>
            Make a difference with every purchase
          </Typography>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            color="primary"
            size="large"
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
