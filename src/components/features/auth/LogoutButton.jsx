import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Button,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    Alert,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { BiLogOut } from 'react-icons/bi';
import useAuthStore from '../../../store/authStore';

export default function Logout() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuthStore();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'error' });

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const openConfirm = useCallback(() => setConfirmOpen(true), []);
    const closeConfirm = useCallback(() => setConfirmOpen(false), []);

    const handleLogout = useCallback(async () => {
        try {
            logout();
            setConfirmOpen(false);
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
            setSnack({ open: true, message: 'Logout failed. Please try again.', severity: 'error' });
        }
    }, [logout, navigate]);

    const handleSnackClose = useCallback(() => setSnack((s) => ({ ...s, open: false })), []);

    if (!isAuthenticated) return null;

    return (
        <>
            {isSmall ? (
                <Tooltip title="Logout">
                    <IconButton
                        onClick={openConfirm}
                        aria-label="Logout"
                        sx={{
                            color: 'primary.main',
                            '&:hover': { backgroundColor: 'action.hover' },
                        }}
                    >
                        <BiLogOut size={20} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<BiLogOut size={18} />}
                    onClick={openConfirm}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 1,
                    }}
                    aria-label="Logout"
                >
                    Logout
                </Button>
            )}

            <Dialog open={confirmOpen} onClose={closeConfirm} aria-labelledby="confirm-logout-title">
                <DialogTitle id="confirm-logout-title">Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to log out from your account?</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button onClick={closeConfirm} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} variant="contained" color="error" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snack.open} autoHideDuration={4000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={snack.severity} sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </>
    );
}