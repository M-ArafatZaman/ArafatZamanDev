import React, {useState} from 'react';
// @mui components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// @mui icons
import Icon from '@mui/material/Icon';
import MailIcon from "@mui/icons-material/Mail";

const TITLE_LENGTH = 255;
const MESSAGE_LENGTH = 50;

const ContactForm: React.FC = () => {

    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    // Function to update the title
    const UpdateTitle = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(e.currentTarget.value.substring(0, TITLE_LENGTH))
    };

    // Update the message
    const UpdateMessage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMessage(e.currentTarget.value.substring(0, MESSAGE_LENGTH))
    };

    return (
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
        </Box>
    )
};

export default ContactForm;