import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// eslint-disable-next-line react/prop-types
export default function MuiToast({ open, handleClose}) {

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Task Saved!!
        </Alert>
      </Snackbar>
    </div>
  );
}