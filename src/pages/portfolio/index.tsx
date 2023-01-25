import React, {createRef, useEffect} from 'react';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// Example response for dev
import {response} from './testResponse';
import {PortfolioItem} from './types';
// Components
import PortfolioItemGrid from './components/PortfolioItemGrid';

/* The portfolio page */
const Portfolio: React.FC = () => {

    const examplePayload: PortfolioItem[] = Array(5).fill(response.items).flat();
    console.log(examplePayload);
    
    return (
        <Container sx={{py: 2}}>
            <Grid container justifyContent="center" spacing={2}>
                {examplePayload.map((portfolio) => {
                    
                    return (
                    <PortfolioItemGrid 
                        name={portfolio.name}
                        short_description={portfolio.short_description}
                        tags={portfolio.tags}
                    />
                    )
                })}

            </Grid>
        </Container>
    );
};

export default Portfolio;