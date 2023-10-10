import React from 'react';
import PropTypes from 'prop-types';

//MUI
import { Snackbar, Alert } from '@mui/material';

const MessageCard = ({ msg, type, open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          <b>{msg}</b>
        </Alert>
      </Snackbar>
    </>
  );
};

MessageCard.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default MessageCard;
