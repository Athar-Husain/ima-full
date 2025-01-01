import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { selectSnackbar, closeSnackbar } from "../redux/features/auth/memberSlice";

const AppSnackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(selectSnackbar);

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
    open={snackbar.open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioning at top center
  >
    <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>
      {snackbar.message}
    </Alert>
  </Snackbar>
  );
};

export default AppSnackbar;
