import React, {useContext} from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// Components
import PortfolioItemGrid from '../components/PortfolioItemGrid';
// Context
import {PortfolioContext} from '../reducer';

const PortfolioItems: React.FC = () => {
    const context = useContext(PortfolioContext);

    return (
        <Grid container justifyContent="center" spacing={2}>
            {
            // While it is loading, show a loading
            context.isLoading ? 
            <Typography>LOADING...</Typography>
            :
            // If it is not loading, check for error
            context.error ?
            <Grid item p={2} xs={12}>
                <Alert severity='error' variant="standard">
                    <AlertTitle>Error</AlertTitle>
                    {context.errorMessage}
                </Alert>
            </Grid>
            :
            // Else everything else is fine
            context.items.map((portfolio, i) => (
                <PortfolioItemGrid
                    index={i}
                    key={i}
                    name={portfolio.name}
                    short_description={portfolio.short_description}
                    image={portfolio.imageURL}
                    tags={portfolio.tags}
                    slug={portfolio.slug}
                />
            ))}
        </Grid>
    )
};

export default PortfolioItems;