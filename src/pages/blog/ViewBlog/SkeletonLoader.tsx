import React from 'react';
// @mui components
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';

// The skeleton that is displayed while the blog is loading
const SkeletonLoader: React.FC = () => {
    return (
        <Box>
            {/* The title */}
            <Skeleton variant="text" sx={{fontSize: "3rem"}} />
            <Skeleton variant="text" />
            <Divider sx={{my: 1}}/>
            {
                [1,2,3].map((i) => (
                    <Box key={i} py={1}>
                        <Skeleton variant="rounded" height={100} sx={{mb: 1}} />
                        <Skeleton variant="rounded" height={75} />
                    </Box>
                ))
            }
        </Box>
    )
};

export default SkeletonLoader;