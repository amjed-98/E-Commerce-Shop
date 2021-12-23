import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div>
      <Typography variant='subtitle1'>
        You have no items in your shopping cart,
        <Link to='/'>Start adding some</Link>
      </Typography>
    </div>
  );
};

export default EmptyCart;
