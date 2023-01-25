import React, {createRef, useEffect} from 'react';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// Some common components from home
import AppCard from '../home/components/AppCard';
/* The portfolio page */
const Portfolio: React.FC = () => {

    
    return (
        <Container sx={{py: 2}}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                    <AppCard>
                        <Typography>Test</Typography>
                        <Typography>Test</Typography>
                        <Typography>Test</Typography>
                        <Typography>Test</Typography>
                        <Typography>Test</Typography>
                        <Typography>Test</Typography>
                    </AppCard>
                </Grid>

            </Grid>
        </Container>
    );
};

export default Portfolio;