import React from 'react';

import { Container, Typography, Button, Grid } from '@material-ui/core';

import FilledCart from './FilledCart';
import EmptyCart from './EmptyCart';
import useStyles from './styles';

const Cart = ({
  cart,

  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();
  const hasItems = cart?.line_items?.length;

  let content = (
    <>
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your Shopping cart
      </Typography>

      {hasItems ? (
        <FilledCart
          cart={cart}
          handleUpdateCartQty={handleUpdateCartQty}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
        />
      ) : (
        <EmptyCart />
      )}
    </>
  );

  if (!cart.line_items) content = <h1>loading...</h1>;

  return (
    <Container>
      <div className={classes.toolbar} />
      {content}
    </Container>
  );
};
export default Cart;
