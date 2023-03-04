import React from 'react';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import WorkIcon from '@mui/icons-material/Work';

interface PortfolioProps {
    children: JSX.Element | JSX.Element[] | string | undefined;
}

/* The portfolio page */
const Portfolio: React.FC<PortfolioProps> = (props: PortfolioProps) => {
    const {children} = props;

    return (
        <Container sx={{py: 2}}>
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="center">
                <WorkIcon fontSize="large" sx={{mr: 1}}/>
                <Typography variant="h4">Portfolio</Typography>
            </Box>
            <Divider sx={{mt: 1, mb: 2}}/>

            {/* Portfolio cards */}
            {children}
        </Container>
    );
};

export default Portfolio;