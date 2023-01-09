import React from 'react';
// @mui components
import {
    Box,
    Typography,
    Container,
    Grid,
    Button
} from '@mui/material';
// App theme
import {APP_THEME} from '../../appTheme';
// Icons
import DescriptionIcon from '@mui/icons-material/Description';
import GithubIcon from '@mui/icons-material/GitHub';

const Home: React.FC = () => {

    return (
        <Container>

            <Grid container spacing={2} sx={{marginY: 1}}>

                {/* The software developer container */}
                <Grid item xs={12} sm={6}>
                    <Box sx={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: APP_THEME.shadows[3],
                        padding: 4,
                        paddingTop: 6
                    }}>
                        <Typography variant="h5" sx={{fontWeight: "bold"}}>Hi! I am Arafat</Typography>
                        <Typography variant="h6" sx={{marginBottom: 1}}>I am a software developer</Typography>
                        <Button variant="contained" color="primary" sx={{fontWeight: "bold"}} startIcon={<DescriptionIcon/>}>
                            Download Resume
                        </Button>
                        <br/>
                        <Button variant="contained" color="inherit" sx={{fontWeight: "bold", mt: 1}} startIcon={<GithubIcon/>}
                            href="https://github.com/M-ArafatZaman" target="_blank"
                        >
                            Github
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    RASPBERRY
                </Grid>
            </Grid>

        </Container>
    )
};

export default Home;