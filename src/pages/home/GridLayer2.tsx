import React from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// Other components
import FeatureCard from './components/FeatureCard';
// SVG
import portfolioSVG from '../media/portfolio.svg';
import projectSVG from '../media/projects.svg';
import blogSVG from '../media/blog.svg';
// Utils
import {ElementInViewport} from '../../utils';

function GridLayer2() {

    return (
        <>
        {/* Portfolio */}
        <Grid item xs={12} md={4}>
            <ElementInViewport animation='fadeInLeft' delay={1000}>
                <FeatureCard image={portfolioSVG} href="/portfolio/">
                    <Typography variant="h6"><b>Portfolio</b></Typography>
                    <Typography>Explore my portfolio and discover my past work and experiences.</Typography>
                </FeatureCard>
            </ElementInViewport>
        </Grid>

        {/* Projects */}
        <Grid item xs={12} md={4}>
            <ElementInViewport animation="fadeInUp" delay={1000}>
                <FeatureCard image={projectSVG} href="/projects/">
                    <Typography variant="h6"><b>Projects</b></Typography>
                    <Typography>Check out my personal projects and learn more about my interests and skills.</Typography>
                </FeatureCard>
            </ElementInViewport>
        </Grid>

        {/* Blogs */}
        <Grid item xs={12} md={4}>
            <ElementInViewport animation="fadeInRight" delay={1000}>
                <FeatureCard image={blogSVG} href="/blog/">
                    <Typography variant="h6"><b>Blogs</b></Typography>
                    <Typography>Read my latest thoughts and musings on my blog.</Typography>
                </FeatureCard>
            </ElementInViewport>
        </Grid>
        </>
    )
};

export default GridLayer2;