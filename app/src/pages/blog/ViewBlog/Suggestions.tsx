import React from 'react';
import {useNavigate} from '@remix-run/react';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import {SxProps} from '@mui/material/styles';
// @mui icons
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import ClockIcon from '@mui/icons-material/WatchLater';
// Other components
import AppCard from '../../home/components/AppCard';
// Context and types
import {BlogItems} from '../types';


// Individual suggestion item
type SuggestionItemProps = Omit<BlogItems, "tags">;

const SuggestionItem: React.FC<SuggestionItemProps> = (props: SuggestionItemProps) => {
    const {name, slug, date_created, read_time} = props;

    // Some styles to make it hoverable and clickable
    const CardStyles: SxProps = {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 150ms ease-in-out",
        ":hover": {
            backgroundColor: "rgba(0,0,0,.15)"
        },
        ":active": {
            backgroundColor: "rgba(0,0,0,.25)"
        }
    };

    // On click to go to the blog
    const navigate = useNavigate();
    const onClick = () => { navigate(`/blog/${slug}/`) };

    return (
        <Grid item xs={12} sm={4}>
            <Box sx={{height: "100%", width: "100%", flexAlign: "start"}} onClick={onClick}>
                <AppCard sx={CardStyles}>
                    {/* Title */}
                    <Box flexGrow={1} px={2} pt={1} pb={0}>
                        <Typography><b>{name}</b></Typography>
                    </Box>
                    {/* Date and time created */}
                    <Box px={2} pt={0} pb={1}>
                        {/* Date and read time */}
                        <Typography variant="caption" color="GrayText" sx={{display: "flex", flexDirection: "row", alignItems: "center", fontWeight: "600", py: 1}}>
                            <CalendarIcon/>
                            <Typography variant="inherit">&nbsp;{date_created} |&nbsp;</Typography>
                            <ClockIcon/>
                            <Typography variant="inherit">&nbsp;{read_time} min read</Typography>
                        </Typography>
                    </Box>
                </AppCard>
            </Box>
        </Grid>
    )
}

interface SuggestionProps {
    suggestions: SuggestionItemProps[];
}

// Suggestions main component
const Suggestions: React.FC<SuggestionProps> = (props: SuggestionProps) => {

    const {suggestions} = props;

    return (
        <AppCard sx={{mt: 1}}>
            <Box sx={{p: 3}}>
                <Typography variant="h6">Suggested</Typography>
                <Divider sx={{my: 1}}/>

                <Grid container spacing={2}>
                    {
                        suggestions.map((elem, i) => (
                            <SuggestionItem
                                key={i}
                                name={elem.name}
                                slug={elem.slug}
                                date_created={elem.date_created}
                                read_time={elem.read_time}
                            />
                        ))
                    }
                </Grid>
            </Box>
        </AppCard>
    )
};

export default Suggestions;