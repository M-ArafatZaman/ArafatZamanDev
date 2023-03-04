import React from 'react';
import {useLoaderData} from '@remix-run/react';
// @mui components
import Grid from '@mui/material/Grid';
// Components
import PortfolioItemGrid from './PortfolioItemGrid';
import Error from '../../../components/Error';
// Loader and response types
import {GetPortfolioItemsLoader} from '../loader';
import {PortfolioAPIResponse} from '../types';
// The portfolio wrapper
import Portfolio from '../index';

const PortfolioItems: React.FC = () => {
    //const context = useContext(PortfolioContext);
    const data: PortfolioAPIResponse = useLoaderData<typeof GetPortfolioItemsLoader>();

    return (
        <Portfolio>
            <Grid container justifyContent="center" spacing={2}>
                {
                // If there is for error
                data.status !== "OK" ?
                <Grid item p={2} xs={12}>
                    <Error message="Sorry, an unknown error occured." />
                </Grid>
                :
                // Else everything else is fine
                data.items.map((portfolio, i) => (
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
        </Portfolio>
    )
};

export default PortfolioItems;