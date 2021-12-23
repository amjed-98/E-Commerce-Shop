import {
  Typography,
  Button,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import useStyles from './styles';

let Confirmation = ({ order, isFinished }) => {
  const classes = useStyles();
  if (order.customer) {
    return (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase, {order.customer.firstname}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='subtitle2'>
            Order ref: {order.customer_reference}
          </Typography>
        </div>

        <br />

        <Button component={Link} to='0' variant='outlined' type='button'>
          Back to Home
        </Button>
      </>
    );
  } else if (isFinished) {
    // mocking a successful transaction
    return (
      <>
        <div>
          <Typography variant='h5'>Thank you for your purchase,</Typography>
          <Divider className={classes.divider} />
        </div>

        <br />

        <Button component={Link} to='/' variant='outlined' type='button'>
          Back to Home
        </Button>
      </>
    );
  } else {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }
};

export default Confirmation;
