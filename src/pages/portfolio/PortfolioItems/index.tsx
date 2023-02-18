import React, {useContext} from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
// Components
import PortfolioItemGrid from './PortfolioItemGrid';
import Error from '../../../components/Error';
// Context
import {PortfolioContext} from '../reducer';

const PortfolioItems: React.FC = () => {
    const context = useContext(PortfolioContext);

    return (
        <Grid container justifyContent="center" spacing={2}>
            {
            // While it is loading, show a loading
            context.isLoading ? 
            [1,2,3,4].map((i) => (
                <Grid key={i} item xs={12} md={3}>
                    <Skeleton
                        variant="rounded"
                        height={100}
                    />
                </Grid>
            ))
            :
            // If it is not loading, check for error
            context.error ?
            <Grid item p={2} xs={12}>
                <Error message={context.errorMessage} />
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