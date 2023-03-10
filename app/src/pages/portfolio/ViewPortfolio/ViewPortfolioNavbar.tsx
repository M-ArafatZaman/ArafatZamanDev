import React, {useState, createRef, useEffect} from 'react';
import {useNavigate, useParams, useLocation} from '@remix-run/react';
// @mui components
import Box, {BoxProps} from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import {styled} from '@mui/material/styles';
// @mui icons
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Other components
import AppCard from '../../home/components/AppCard';
// App theme
import {APP_THEME} from '../../../appTheme';
// Header ref
import {HeaderRef} from '../../../layout/header';
// Types
import {PortfolioItem} from '../types';

interface ViewPortfolioNavbarProps {
    other_portfolio_items: PortfolioItem["other_portfolio_items"] 
}

// A custom component
const AbsoluteBox = styled(Box)<BoxProps>(({theme}) => ({
    [theme.breakpoints.up("md")]: {
        position: "absolute",
        top: "16px"
    },
    [theme.breakpoints.down("md")]: {
        position: "static"
    }
}));

// The navbar component
const ViewPortfolioNavbar: React.FC<ViewPortfolioNavbarProps> = (props: ViewPortfolioNavbarProps) => {
    const {other_portfolio_items} = props;
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const params = useParams<{slug: string}>();
    // Router
    const navigate = useNavigate();
    const location = useLocation();
    // The navbar container ref
    const NavRef: React.RefObject<HTMLElement> = createRef<HTMLElement>();
    const NavBackdropRef: React.RefObject<HTMLElement> = createRef<HTMLElement>();

    // When the menu button is clicked, toggle the buttons
    const toggleButton = () => {
        setCollapsed((prev) => !prev);
    };

    useEffect(() => {
        // Whenever location updates, scroll window to top
        window.scrollTo(0,0);

    }, [location.pathname]);

    // Make the navbar sticky on scroll
    const onScroll = () => {
        if (NavRef.current !== null && HeaderRef.current !== null && NavBackdropRef.current !== null) {
            // If the navbar backdrop (the element that acts a navbar) is outside the screen
            // Bring it down using top property
            if (NavBackdropRef.current.getBoundingClientRect().y <= HeaderRef.current.clientHeight + 16) {
                NavRef.current.style.top = `${HeaderRef.current.clientHeight - NavBackdropRef.current.getBoundingClientRect().y + 32}px`;
            } else {
            // Else just set top to padding
                NavRef.current.style.top = "16px";
            }
        }
    };

    // Constructor to watch for changes to Navbar and header elements and update the event listener
    useEffect(() => {

        window.addEventListener("scroll", onScroll);

        // Destructor
        return () => {
            // Remove the event listener
            window.removeEventListener("scroll", onScroll);
        }
    }, [NavRef, NavBackdropRef, HeaderRef]);

    // Destructor to remove eventlistener regardless if it has been added
    useEffect(() => {
        // Destructor
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [])

    return (
        <>
        {/* The navbar backdrop */}
        <Box ref={NavBackdropRef}></Box>

        {/* The navbar */}
        <AbsoluteBox ref={NavRef}>
            <AppCard sx={{backgroundColor: APP_THEME.palette.primary.main}}>
                <Box p={2} display="flex" alignItems="center">
                    <IconButton onClick={toggleButton}><MenuIcon/></IconButton>
                    <Typography variant="h6">Contents</Typography>
                </Box>

                {/* Buttons */}
                <Collapse in={!collapsed}>
                    <Box p={2} sx={{borderTop: "1px solid rgba(0,0,0,.15)"}}>
                        <Box sx={{mb: 1}}>
                            <Typography variant="caption" sx={{color: "rgba(0,0,0,.65)"}}><b>NAVIGATION</b></Typography>
                            <Button 
                                variant="contained"
                                color="info"
                                startIcon={<ArrowBackIcon/>} 
                                fullWidth
                                onClick={() => {navigate(`/portfolio/`)}}
                            >Go to portfolio</Button>
                        </Box>

                        <Typography variant="caption" sx={{color: "rgba(0,0,0,.65)"}}><b>PORTFOLIO ITEMS</b></Typography>
                        {other_portfolio_items.map((P_ITEMS, i) => (
                            <Button 
                                key={i}
                                fullWidth 
                                variant="contained" 
                                sx={{backgroundColor: "rgba(255,255,255,0.4)", my: 0.5}}
                                onClick={(e: React.MouseEvent<HTMLElement>) => {
                                    e.preventDefault();
                                    navigate(`/portfolio/${P_ITEMS.slug}`)
                                }}
                                disabled={params.slug == P_ITEMS.slug}
                                href={`/portfolio/${P_ITEMS.slug}/`}
                            >{P_ITEMS.name}</Button>
                        ))}
                    </Box>
                </Collapse>
            </AppCard>
        </AbsoluteBox>
        </>
    )
};

export default ViewPortfolioNavbar;