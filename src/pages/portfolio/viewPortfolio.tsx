import React from 'react';
import {useParams} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const ViewPortfolio: React.FC = () => {
    const params = useParams<{slug: string}>();

    return (
        <Container sx={{p: 2}}>
            <Typography> VIEWING PORTFOLIO - {params.slug} </Typography>
        </Container>
    )
};

export default ViewPortfolio;