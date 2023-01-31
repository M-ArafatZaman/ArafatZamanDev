import React from 'react';
// @mui components
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Chip from "@mui/material/Chip";
// @mui icons
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import ClockIcon from '@mui/icons-material/WatchLater';
// Import blog items type
import {BlogItems} from '../types';

interface ListBlogsProps extends BlogItems {
    isLast: boolean;
};

const ListBlogs: React.FC<ListBlogsProps> = (props: ListBlogsProps) => {

    const {name, date_created, slug, read_time, tags, isLast} = props;

    return (
        <ListItemButton divider={!isLast}>
            <ListItemText>
                {/* Name */}
                <Typography variant="h6">
                    {name}
                </Typography>
                {/* Date and read time */}
                <Typography variant="subtitle2" color="GrayText" sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <CalendarIcon/>
                    <Typography variant="inherit">&nbsp;{date_created} |&nbsp;</Typography>
                    <ClockIcon/>
                    <Typography variant="inherit">&nbsp;{read_time} min read</Typography>
                </Typography>
                {/* Tags */}
                <Box display="flex" flexDirection="row" py={1}>
                    {tags.map((elem, i) => <Chip label={elem} key={i} size="small" sx={{mr: .25}} />)}
                </Box>
            </ListItemText>
        </ListItemButton>
    )
};

export default ListBlogs;