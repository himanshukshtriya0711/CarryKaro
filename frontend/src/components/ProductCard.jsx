import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

function ProductCard({ product }) {
  const { id, name, description, capacity, base_price, ad_price, is_sponsored, image } = product;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({
      id,
      name,
      capacity,
      base_price,
      ad_price,
      is_sponsored,
      image
    }));
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={image || 'https://via.placeholder.com/200'}
        alt={name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Capacity: {capacity}kg
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ₹{is_sponsored ? ad_price : base_price}
        </Typography>
        {is_sponsored && (
          <Chip
            label="Ad Sponsored"
            color="secondary"
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={`/product/${id}`}
          size="small"
          color="primary"
        >
          View Details
        </Button>
        <Button size="small" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
