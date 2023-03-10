import {createTheme} from '@mui/material/styles';

const APP_THEME = createTheme({
    palette: {
        primary: {
            main: "#14EADD"
        },
        secondary: {
            main: "#09605A"
        },
        background: {
            paper: "#DCE9EC"
        }
    },
    typography: {
        fontFamily: "\"Montserrat\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
    }
})

export {APP_THEME};