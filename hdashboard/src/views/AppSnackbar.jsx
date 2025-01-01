import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { selectSnackbar as stateSelectSnackbar, closeSnackbar as stateCloseSnackbar } from "../redux/features/state/stateSlice";
import { styled } from '@mui/system';

// Styled Alert component for professional look
const StyledAlert = styled(Alert)(({ theme, severity }) => ({
  
  backgroundColor: severity === 'success' ? '#ccffe5' : severity === 'error' ? '#ffcccc' : '#ffcccc',

  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
}));

const AppSnackbar = ({ type = 'state' }) => {
  const dispatch = useDispatch();

  // Conditionally select the snackbar based on the type prop
  const snackbar = useSelector(stateSelectSnackbar);

  const handleClose = () => {
    dispatch(stateCloseSnackbar());
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioning at top center
    >
      {/* Styled Alert for a good looking professional snackbar */}
      <StyledAlert onClose={handleClose} severity={snackbar.severity}>
        {snackbar.message}
      </StyledAlert>
    </Snackbar>
  );
};

export default AppSnackbar;
