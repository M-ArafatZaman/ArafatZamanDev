import React, {useEffect, useState} from 'react';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import WorkIcon from '@mui/icons-material/Work';
// Example response for dev
import {PortfolioItem, PortfolioAPIResponse} from './types';
// Components
import PortfolioItemGrid from './components/PortfolioItemGrid';
// Endpoints
import {BASE, GET_PORTFOLIO_ITEMS} from './ENDPOINT';

/* The portfolio page */
const Portfolio: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [items, setItems] = useState<PortfolioItem[]>([] as PortfolioItem[]);

    // Fetch data from API endpoint
    useEffect(() => {
        // Fetch
        fetch(`${BASE}${GET_PORTFOLIO_ITEMS}`, {
            method: "GET",
            mode: "cors"
        })
        .then((response) => response.json())
        .then((response: PortfolioAPIResponse) => {
            if (response.status === "OK") {
                setItems(response.items);
            }
        })
        .finally(() => {
            setIsLoading(false);
        });

    }, []);
    
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
                {
                    isLoading ? 
                    <Typography>LOADING</Typography>
                    : 
                    items.map((portfolio, i) => {
                    
                        return (
                        <PortfolioItemGrid 
                            index={i}
                            key={i}
                            name={portfolio.name}
                            short_description={portfolio.short_description}
                            image={portfolio.imageURL}
                            tags={portfolio.tags}
                        />
                        )
                    })
                }

            </Grid>
        </Container>
    );
};

export default Portfolio;