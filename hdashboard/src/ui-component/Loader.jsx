// material-ui
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

// ==============================|| LOADER ||============================== //

const Loader = () => (
  <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1301, width: '100%' }}>
    <CircularProgress color="primary" />
  </Box>
);

export default Loader;
