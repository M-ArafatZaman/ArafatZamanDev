import React from 'react';
// @mui components
import {
    Typography,
    Container,
    Grid,
} from '@mui/material';
// Icons
// Import svgs
import blogSVG from '../media/blog.svg';
import portfolioSVG from '../media/portfolio.svg';
import projectSVG from '../media/projects.svg';
// Other components
import FeatureCard from './components/FeatureCard';
// Grid layers
import GridLayer1 from './GridLayer1';
import GridLayer2 from './GridLayer2';

const Home: React.FC = () => {

    return (
        <Container>

            {/* The first grid with greetings and raspberry container */}
            <Grid container spacing={2} sx={{marginY: 0}}>
                <GridLayer1/>
            </Grid>

            {/* The second container containing portfolio, projects, blogs */}
            <Grid container paddingY={2} spacing={2}>
                <GridLayer2/>
            </Grid>

        </Container>
    )
};

export default Home;