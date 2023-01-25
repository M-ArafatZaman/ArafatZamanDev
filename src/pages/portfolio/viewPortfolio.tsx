import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
// Other components
import AppCard from '../home/components/AppCard';
// Types
import {ViewPortfolioItemAPIResponse, PortfolioItem} from './types';
import {BASE, VIEW_PORTFOLIO_ITEMS} from './ENDPOINT';

const ViewPortfolio: React.FC = () => {
    const params = useParams<{slug: string}>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<PortfolioItem>();
    const [found, setFound] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${BASE}${VIEW_PORTFOLIO_ITEMS}${params.slug}`, {
            method: "GET",
            mode: "cors"
        })
        .then((response) => response.json())
        .then((response: ViewPortfolioItemAPIResponse) => {
            if (response.status == "OK") {
                // Found item
                setData(response.payload);
                setFound(true);
            }
            // Else not found. found state is false by default
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <Container sx={{p: 2}}>
            <Grid container>
                {
                    isLoading ? <Typography>LOADING...</Typography> :

                    !found ? <Typography>NOT FOUND</Typography> :
                    
                    /* Main portfolio */
                    <>
                        <Grid item xs={12} md={8}>
                            <AppCard>
                                <Box sx={{p: 3}}>
                                    {/* Header and tags */}
                                    <Typography variant="h4" sx={{textDecoration: "underline", mb: 1}}>{data?.name}</Typography>
                                    {data?.tags.map((str, i) => <Chip label={str} size="small" color="info" sx={{mr: 1}} key={i}/>) }
                                    
                                    <Divider sx={{my: 2}}/>

                                    {/* Content */}
                                    <Typography>
                                        {data?.content}
                                    </Typography>
                                </Box>
                            </AppCard>
                        </Grid>
                    </>

                }
            </Grid>
        </Container>
    )
};

export default ViewPortfolio;