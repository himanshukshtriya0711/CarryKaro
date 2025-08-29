import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Chip,
  CircularProgress,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import { addItem } from '../features/cart/cartSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}/`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'Error loading product details',
        severity: 'error',
      });
    }
  };

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
    setSnackbar({
      open: true,
      message: 'Product added to cart successfully',
      severity: 'success',
    });
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 500,
                objectFit: 'contain',
                borderRadius: 1,
              }}
              src={product.image || 'https://via.placeholder.com/500'}
              alt={product.name}
            />
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            {product.is_sponsored && (
              <Chip
                label="Ad Sponsored"
                color="secondary"
                sx={{ mb: 2 }}
              />
            )}

            <Typography variant="h5" color="primary" gutterBottom>
              ₹{product.is_sponsored ? product.ad_price : product.base_price}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Capacity: {product.capacity}kg
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 3 }}
            >
              {product.description}
            </Typography>

            {/* Quantity Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Quantity:
              </Typography>
              <TextField
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                size="small"
                sx={{ width: 100 }}
              />
            </Box>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              fullWidth
            >
              Add to Cart
            </Button>

            {/* Product Features */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Features:
              </Typography>
              <ul>
                <li>Eco-friendly material</li>
                <li>Durable and reusable</li>
                <li>Water-resistant</li>
                <li>Easy to clean</li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProductDetail;
