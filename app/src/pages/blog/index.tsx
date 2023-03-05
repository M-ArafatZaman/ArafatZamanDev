import React from 'react';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import FeedIcon from '@mui/icons-material/Feed';

interface BlogProps {
    children: JSX.Element | JSX.Element[] | string | undefined;
}

/* The Blog page wrapper */
const Blog: React.FC<BlogProps> = (props: BlogProps) => {
    const {children} = props;

    return (
        <Container sx={{py: 2}}>
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="center">
                <FeedIcon fontSize="large" sx={{mr: 1}}/>
                <Typography variant="h4">Blogs</Typography>
            </Box>
            <Divider sx={{mt: 1, mb: 2}}/>

            {/* The children */}
            {children}
        </Container>
    );
};

export default Blog;