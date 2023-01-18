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

const Home: React.FC = () => {

    return (
        <Container>

            {/* The first grid with greetings and raspberry container */}
            <Grid container spacing={2} sx={{marginY: 0}}>
                <GridLayer1/>
            </Grid>

            {/* The second container containing portfolio, projects, blogs */}
            <Grid container paddingY={2} spacing={2}>
                {/* Portfolio */}
                <Grid item xs={12} sm={4}>
                    <FeatureCard image={portfolioSVG} href="#">
                        <Typography variant="h6"><b>Portfolio</b></Typography>
                        <Typography>Explore my portfolio and discover my past work and experiences.</Typography>
                    </FeatureCard>
                </Grid>

                {/* Projects */}
                <Grid item xs={12} sm={4}>
                    <FeatureCard image={projectSVG} href="#">
                        <Typography variant="h6"><b>Projects</b></Typography>
                        <Typography>Check out my personal projects and learn more about my interests and skills.</Typography>
                    </FeatureCard>
                </Grid>

                {/* Blogs */}
                <Grid item xs={12} sm={4}>
                    <FeatureCard image={blogSVG} href="#">
                        <Typography variant="h6"><b>Blogs</b></Typography>
                        <Typography>Read my latest thoughts and musings on my blog.</Typography>
                    </FeatureCard>
                </Grid>
            </Grid>

        </Container>
    )
};

export default Home;