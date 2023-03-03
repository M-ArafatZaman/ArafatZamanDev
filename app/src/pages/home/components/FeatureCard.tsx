import React from 'react';
import {useNavigate} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// Extras
import AppCard from './AppCard';
import {APP_THEME} from '../../../../src/appTheme';

interface FeatureCardProps {
    image: string;
    children: JSX.Element | JSX.Element[];
    href: string;
}

const FeatureCard: React.FC<FeatureCardProps> = (props: FeatureCardProps) => {

    const {children, image, href} = props;
    const navigate = useNavigate();

    // OnClick go to the href
    const onClick = () => {
        navigate(href);
    };

    return (
        <AppCard sx={{
            transition: "all 300ms linear",
            ':hover': {
                transform: "scale(1.03)"
            },
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* Image */}
            <Box display="flex" justifyContent="center" py={2} px={1} sx={{backgroundColor: "#C3FFFB"}}>
                <img src={image} style={{height: "200px", objectFit: "contain"}} />
            </Box>
            {/* Content */}
            <Box p={3} flexGrow={1}>
                {children}
            </Box>
            <Divider/>
            <Box px={3} py={2} sx={{backgroundColor: APP_THEME.palette.background.paper}}>
                <Button variant='contained' onClick={onClick}>Visit</Button>
            </Box>
        </AppCard>
    )
};

export default FeatureCard;