import React, {useContext} from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
// Components
import PortfolioItemGrid from './components/PortfolioItemGrid';
// Context
import {PortfolioContext} from './portfolioContext';

const PortfolioItems: React.FC = () => {
    const context = useContext(PortfolioContext);

    return (
        <Grid container justifyContent="center" spacing={2}>
            {context.isLoading ? 
            <Typography variant="h1">TEST</Typography>
            :
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