import React from 'react';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import TerminalIcon from '@mui/icons-material/Terminal';

interface ProjectProps {
    children: JSX.Element | JSX.Element[] | string | undefined;
}

/* The Projects page */
const Projects: React.FC<ProjectProps> = (props: ProjectProps) => {
    const {children} = props;

    return (
        <Container sx={{py: 2}}>
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="center">
                <TerminalIcon fontSize="large" sx={{mr: 1}}/>
                <Typography variant="h4">Projects</Typography>
            </Box>
            <Divider sx={{mt: 1, mb: 2}}/>

            {/* Portfolio cards */}
            {children}
        </Container>
    );
};

export default Projects;