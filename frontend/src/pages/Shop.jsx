import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  FormControlLabel,
  Switch,
  CircularProgress,
} from '@mui/material';
import ProductCard from '../components/ProductCard';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    capacity: 'all',
    priceRange: [0, 1000],
    onlySponsored: false,
  });

  useEffect(() => {
    // TODO: Fetch products from API
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesCapacity =
      filters.capacity === 'all' || product.capacity === parseInt(filters.capacity);
    const matchesPrice =
      product.base_price >= filters.priceRange[0] &&
      product.base_price <= filters.priceRange[1];
    const matchesSponsored = !filters.onlySponsored || product.is_sponsored;

    return matchesSearch && matchesCapacity && matchesPrice && matchesSponsored;
  });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Filters Section */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Search Products"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Capacity</InputLabel>
                <Select
                  value={filters.capacity}
                  label="Capacity"
                  onChange={(e) => handleFilterChange('capacity', e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="1">1 kg</MenuItem>
                  <MenuItem value="2">2 kg</MenuItem>
                  <MenuItem value="5">5 kg</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>Price Range</Typography>
              <Slider
                value={filters.priceRange}
                onChange={(e, value) => handleFilterChange('priceRange', value)}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">₹{filters.priceRange[0]}</Typography>
                <Typography variant="body2">₹{filters.priceRange[1]}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={filters.onlySponsored}
                    onChange={(e) =>
                      handleFilterChange('onlySponsored', e.target.checked)
                    }
                  />
                }
                label="Ad-Sponsored Only"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
              {filteredProducts.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" textAlign="center">
                    No products found matching your criteria.
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Shop;
