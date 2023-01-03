import react from 'react';
// @mui components
import {
    Box,
    Link,
    SxProps
} from '@mui/material';

// NavLink Props style
interface NavLinkProps {
    label: string;
    href?: string;
};
// The link component
const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps) => {
    const {href, label} = props;

    // The link styles
    const LinkStyles: SxProps = {
        color: "#fff",
        textDecoration: "none",
        transition: "all ease-in-out 300ms",
        '&:hover': {
            color: "rgba(255,255,255,0.8)",
        },
        '&:active': {
            color: "rgba(255,255,255,0.2)"
        },
        borderBottom: "3px solid rgba(255,255,255,0.3)"
    }

    return (
        <Box sx={{
            paddingX: 2,
            cursor: "pointer"
        }}>
            <Link href={href} sx={LinkStyles}>{label}</Link>
        </Box>
    )
}

// The main navbar
const Navbar: React.FC = () => {
    
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <NavLink
                label="HOME"
                href="#"
            />
            <NavLink
                label="PORTFOLIO"
                href="#"
            />
            <NavLink
                label="PROJECTS"
                href="#"
            />
            <NavLink
                label="BLOG"
                href="#"
            />
            <NavLink
                label="CONTACT"
                href="#"
            />
        </Box>
    )
};

export default Navbar;