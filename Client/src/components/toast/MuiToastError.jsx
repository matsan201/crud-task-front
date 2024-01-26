import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// eslint-disable-next-line react/prop-types
export default function MuiToastError({ open, handleClose}) {

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%', backgroundColor: '#ff5252' }}
        >
          Task deleted
        </Alert>
      </Snackbar>
    </div>
  );
}