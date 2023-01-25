import React, {createRef, useEffect} from 'react';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import WorkIcon from '@mui/icons-material/Work';
// Example response for dev
import {response} from './testResponse';
import {PortfolioItem} from './types';
// Components
import PortfolioItemGrid from './components/PortfolioItemGrid';

/* The portfolio page */
const Portfolio: React.FC = () => {

    const examplePayload: PortfolioItem[] = Array(5).fill(response.items).flat();
    
    return (
        <Container sx={{py: 2}}>
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="center">
                <WorkIcon fontSize="large" sx={{mr: 1}}/>
                <Typography variant="h4">Portfolio</Typography>
            </Box>
            <Divider sx={{mt: 1, mb: 2}}/>

            {/* Portfolio cards */}
            <Grid container justifyContent="center" spacing={2}>
                {examplePayload.map((portfolio, i) => {
                    
                    return (
                    <PortfolioItemGrid 
                        key={i}
                        name={portfolio.name}
                        short_description={portfolio.short_description}
                        image={portfolio.imageURL}
                        tags={portfolio.tags}
                    />
                    )
                })}

            </Grid>
        </Container>
    );
};

export default Portfolio;