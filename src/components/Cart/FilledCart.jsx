import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Button, Typography } from '@material-ui/core';

import CartItem from './CartItem/CartItem';

import useStyles from './styles';
import { Link } from 'react-router-dom';

const FilledCart = ({
  cart,
  handleEmptyCart,
  handleRemoveFromCart,
  handleUpdateCartQty,
}) => {
  const classes = useStyles();

  return (
    <>
      {/* display items */}
      <Grid container spacing={3}>
        {cart.line_items?.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQty={handleUpdateCartQty}
              item={item}
            />
          </Grid>
        ))}
      </Grid>

      {/* display subtotal */}
      <div className={classes.cardDetails}>
        <Typography variant='h4'>
          Subtotal : {cart?.subtotal.formatted_with_symbol}
        </Typography>

        {/* display buttons */}
        <div>
          <Button
            onClick={handleEmptyCart}
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'>
            Empty cart
          </Button>

          <Button
            component={Link}
            to='/checkout'
            className={classes.checkoutButton}
            size='large'
            type='button'
            variant='contained'
            color='primary'>
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilledCart;
