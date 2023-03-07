import React, {useState} from 'react';
// @mui components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
// @mui icons
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// App theme
import {APP_THEME} from '../../../../app/src/appTheme';
// Contact form
import ContactForm from './ContactForm';
// Other components
import AppCard from '../home/components/AppCard';
import ProgrammerVibin from './media/programmer_vibin.gif';

const EMAIL = "mdarafatzaman1@gmail.com";

/* The Contact page */
const Contact: React.FC = () => {
    
    interface SnackDataType {
        open: boolean;
        message: string;
    }
    
    // State manager for snackbar
    const [snackData, setSnackData] = useState<SnackDataType>({} as SnackDataType);
    
    // Close the snackbar
    const closeSnackbar = () => {
        setSnackData((prev) => ({...prev, open: false}) );
    };
    
    // Open the snackbar
    const openSnackbar: (message: string) => () => void = (message: string) => () => {
        setSnackData(() => ({open: true, message: message}))
    };

    // Function to copy email to clipboard
    const copyAddress = () => {
        navigator.clipboard.writeText(EMAIL);
        openSnackbar("Copied email to clipboard.")();
    };


    return (
        <Container sx={{p: 2}}>
            <AppCard>
                <Box 
                    py={2} px={4}
                    display="flex" alignItems="center" 
                    sx={{backgroundColor: APP_THEME.palette.primary.light}}
                >
                    <Grid container spacing={2}>
                        {/* Gif */}
                        <Grid item xs={12} md="auto">
                            <img src={ProgrammerVibin} style={{objectFit: "contain", maxWidth: "400px"}} />
                        </Grid>

                        {/* Contact info */}
                        <Grid item xs={12} md sx={{backgroundColor:"rgba(255,255,255,0)"}}>
                            <AppCard sx={{height: "100%", width: "100%", backgroundColor:"rgba(255,255,255,0)"}}>
                                <Box
                                    sx={{
                                        p: 2,
                                        backgroundColor: "rgba(255,255,255,0.75)",
                                        transition: "all 200ms ease-in-out",
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.95)"
                                        },
                                        height: "100%"
                                    }}
                                >   
                                    {/* Header */}
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <MailOutlineIcon fontSize='large'/>
                                        <Typography variant="h4" sx={{ml: 1}}><u>Contact</u></Typography>
                                    </Box>
                                    <Divider sx={{my: 1}} />
                                    {/* Email */}
                                    <Box p={2}>
                                        <Typography variant="h5"><u>Email</u></Typography>
                                        <Typography>
                                            For business inquiries, email me at <Link href={`mailTo:${EMAIL}`}>{EMAIL}</Link>.
                                        </Typography>
                                        <Box pt={1}>
                                            <Button startIcon={<ContentCopyIcon/>} variant="contained" onClick={copyAddress}>Copy Address</Button>
                                        </Box>
                                    </Box>

                                    {/* or  */}
                                    <Box display="flex" flexDirection="row" alignItems="center" px={2} py={0}>
                                        <Box flexGrow={.5}><Divider/></Box>
                                        <Typography sx={{mx: 1}} variant="caption" color="GrayText">or</Typography>
                                        <Box flexGrow={.5}><Divider/></Box>
                                    </Box>

                                    {/* Contact form */}
                                    <ContactForm/>
                                </Box>
                            </AppCard>
                        </Grid>
                    </Grid>
                </Box>
            </AppCard>

            {/* Snackbar to alert */}
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={snackData.open}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                message={snackData.message}
                action={
                    <IconButton onClick={closeSnackbar}>
                        <CloseIcon htmlColor="#fff"/>
                    </IconButton>
                }
            />
            
        </Container>
    );
};

export default Contact;