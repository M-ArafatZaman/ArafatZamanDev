import React from 'react';
// @mui components
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import {styled, useTheme} from "@mui/material/styles";
// @mui icons
import SearchIcon from '@mui/icons-material/Search';

const CustomSearchBar = styled(InputBase)(({theme}) => ({
    "& .MuiInputBase-input": {
        transition: "all 600ms linear"
    },
    "& .MuiInputBase-input::placeholder": {
        color: "#fff"
    },
    ":hover": {
        backgroundColor: theme.palette.secondary.light
    },
    backgroundColor: theme.palette.secondary.main,
    transition: `all 300ms ease-in-out`,
    borderRadius: theme.spacing(.5),
    paddingLeft: theme.spacing(3), paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0.5), paddingBottom: theme.spacing(0.5), 
    color: "#fff",
    maxWidth: "100%",
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
        "& .MuiInputBase-input:focus": {
            width: "350px"
        }
    }
}));

const SearchBar: React.FC = () => {

    const APP_THEME = useTheme();

    console.log(APP_THEME.breakpoints.up(APP_THEME.breakpoints.values.md));

    return (
        <>
        <Box
            sx={{
                backgroundColor: APP_THEME.palette.secondary.dark,
                px: 3, py: 1, mb: 1,
                borderRadius: 1,
            }}
        >
            <CustomSearchBar 
                placeholder='Search'
                endAdornment={<SearchIcon htmlColor='#EAEAEA' />}
            />
        </Box>
        </>
    )
};

export default SearchBar;