import React, {lazy, Suspense} from 'react';
// @mui components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
// @mui icons
import StarIcon from '@mui/icons-material/Star';
// Grid layers
const GridLayer1 = lazy(() => import("./GridLayer1"));
const GridLayer2 = lazy(() => import("./GridLayer2"));
const GridLayer3 = lazy(() => import("./GridLayer3"));
const GridLayer4 = lazy(() => import("./GridLayer4"));

const Home: React.FC = () => {

    return (
        <Container sx={{pb: 2}}>

            {/* The first grid with greetings and raspberry container */}
            <Grid container spacing={2} sx={{marginY: 0}}>
                <Suspense fallback={<Typography>Loading...</Typography>}>
                    <GridLayer1/>
                </Suspense>
            
                {/* The second container containing portfolio, projects, blogs */}
                <Suspense fallback={<Typography>Loading...</Typography>}>
                    <GridLayer2/>
                </Suspense>

            </Grid>

            <Divider sx={{my:2}} />
            {/* Feature projects title */}
            <Box display="flex" flexDirection="row" alignItems="center">
                <StarIcon fontSize="large" color="warning"/>
                <Typography variant="h4" sx={{ml: 1}}>Featured Projects</Typography>
            </Box>

            {/* The third container containing the lyrics finder */}
            <Suspense fallback={<Typography>Loading...</Typography>}>
                <GridLayer3/>
            </Suspense>

            {/* The fourth container containing the inperil application */}
            <Suspense fallback={<Typography>Loading...</Typography>}>
                <GridLayer4/>
            </Suspense>
        </Container>
    )
};

export default Home;