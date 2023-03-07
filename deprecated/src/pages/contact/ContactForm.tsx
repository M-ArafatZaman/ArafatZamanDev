import React, {useState, useEffect} from 'react';
// @mui components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
// @mui icons
import Icon from '@mui/material/Icon';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
// Endpoints
import {BASE, SEND_MESSAGE} from './ENDPOINT';

const TITLE_LENGTH = 255;
const MESSAGE_LENGTH = 50;

interface SnackDataInterface {
    open: boolean;
    severity: "error" | "success";
    message: string;
}

const ContactForm: React.FC = () => {

    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);
    // State of the snackbar
    const [SnackData, setSnackData] = useState<SnackDataInterface>({
        open: false, severity: "success", message: "NULL"
    });

    // Function to close the snackbar
    const closeSnackbar = () => {
        setSnackData((prev) => ({
            ...prev,
            open: false
        }));
    };

    // Function to show error on snackbar
    const snackError = () => {
        setSnackData((prev) => ({
            ...prev,
            open: true,
            severity: "error",
            message: "An error occured."
        }));
    };

    // Function to update the title
    const UpdateTitle = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(e.currentTarget.value.substring(0, TITLE_LENGTH))
    };

    // Update the message
    const UpdateMessage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMessage(e.currentTarget.value.substring(0, MESSAGE_LENGTH))
    };

    useEffect(() => {
        if (title.length === 0 || title.length > TITLE_LENGTH) {
            setValid(false);
        } else if (message.length === 0 || message.length > MESSAGE_LENGTH) {
            setValid(false);
        } else {
            setValid(true);
        }
    }, [title, message]);

    // Send message
    const sendMessageToServer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        
        fetch(`${BASE}${SEND_MESSAGE}`, {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                message: message
            })
        })
        .then((resp) => resp.json())
        .then((resp) => {
            if (resp.status === "OK") {
                // Message was sent successfully
                setSnackData({
                    open: true,
                    severity: "success",
                    message: "Message was successfully sent!"
                });
                // Clear inputs
                setTitle("");
                setMessage("");
            } else {
                // else an error occurred
                snackError();
            }
        })
        .catch((e) => {
            // An error occured
            snackError();
        })
    };

    return (
        <>
        <Box p={2}>
            <Typography variant="body2"><b>Send a message as anon</b></Typography>
            
            {/* Title */}
            <Box display="flex" mt={1} alignItems="center">
                <TextField 
                    value={title}
                    onChange={UpdateTitle}
                    label="Title"
                    size="small"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        startAdornment: <Icon className="fas fa-user-secret" sx={{mr: 1}} />
                    }}
                    helperText={title.length === TITLE_LENGTH ? "Maximum length reached" : ""}
                />
            </Box>

            {/* Message */}
            <Box mt={1}>
                <TextField 
                    value={message}
                    onChange={UpdateMessage}
                    label="Message"
                    size="small"
                    variant="outlined"
                    fullWidth
                    rows={3} multiline
                    helperText={message.length === MESSAGE_LENGTH ? "Maxmium length reached" : ""}
                />
            </Box>
            <Button 
                sx={{mt: 1}}
                variant="contained"
                color="warning"
                startIcon={<SendIcon/>}
                disabled={!valid}
                onClick={sendMessageToServer}
            >Send</Button>
        </Box>
        
        {/* Snackbar to show status of the response */}
        <Snackbar 
            open={SnackData.open}
            autoHideDuration={6000}
            onClose={closeSnackbar}
        >
            <Alert 
                severity={SnackData.severity} 
                variant="filled" 
                action={<Button color="inherit" onClick={closeSnackbar} >close</Button>}
            >{SnackData.message}</Alert>
        </Snackbar>
        </>
    )
};

export default ContactForm;