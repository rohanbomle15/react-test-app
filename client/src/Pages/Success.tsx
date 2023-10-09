import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Success() {
    const location = useLocation()

    return(
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Grid item xs={12}>
                <Typography component="h5" variant="h5">
                    Application Complete
                </Typography>
            </Grid>   
            <Grid item xs={12}>
            <Typography component="h4" variant="h4">
                    Thank you {location.state.name} for applying to this useful Gov. service
                </Typography>
            </Grid>
            </Box>
        </Container>
        </ThemeProvider>
    )
}