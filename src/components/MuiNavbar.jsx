import { AppBar, Toolbar, Typography } from "@mui/material";

const MuiNavbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>
                    CRUD Task
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default MuiNavbar;