import React from 'react';
// @mui components
import {
    Container,
    Grid,
    Divider,
    Typography,
    Box
} from '@mui/material';
// Grid layers
import GridLayer1 from './GridLayer1';
import GridLayer2 from './GridLayer2';
import GridLayer3 from './GridLayer3';
import GridLayer4 from './GridLayer4';
// @mui icons
import StarIcon from '@mui/icons-material/Star';
// Utils
import {ElementInViewport} from '../../utils';

const Home: React.FC = () => {

    return (
        <Container sx={{pb: 2}}>

            {/* The first grid with greetings and raspberry container */}
            <Grid container spacing={2} sx={{marginY: 0}}>
                <GridLayer1/>
            </Grid>

            {/* The second container containing portfolio, projects, blogs */}
            <Grid container paddingY={2} spacing={2}>
                <GridLayer2/>
            </Grid>

            <Divider sx={{my:1}} />
            {/* Feature projects title */}
            <ElementInViewport delay={500}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <StarIcon fontSize="large" color="warning"/>
                    <Typography variant="h4" sx={{ml: 1}}>Featured Projects</Typography>
                </Box>
            </ElementInViewport>

            {/* The third container containing the lyrics finder */}
            <Grid container spacing={2} paddingY={2}>
                <GridLayer3/>
            </Grid>

            {/* The fourth container containing the inperil application */}
            <Grid container spacing={2} paddingY={2}>
                <GridLayer4/>
            </Grid>
        </Container>
    )
};

export default Home;