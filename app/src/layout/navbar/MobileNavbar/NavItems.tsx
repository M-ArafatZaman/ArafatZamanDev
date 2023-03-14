import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from '@remix-run/react';
// @mui components
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

interface NavItemProps {
    href: string;
    label: string;
    icon: JSX.Element | JSX.Element[];
}
// Each nav items
const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
    const {href, label, icon} = props;

    const location = useLocation();
    const navigate = useNavigate();
    
    // is the current location begins with href
    const isCurrLocation = (): boolean => {
        if (href !== "/") {
            return location.pathname.match(new RegExp("^"+href)) !== null;
        };
        return location.pathname === "/";
    };
    // Current state
    const [active, setActive] = useState<boolean>(isCurrLocation());
    
    // Update active whenever the path changes
    useEffect(() => {
        setActive(isCurrLocation());
    }, [location.pathname]);

    // On Click
    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(href);
    }

    return (
        <ListItemButton disabled={active} href={href} onClick={onClick}>
            {/* Icon */}
            <ListItemIcon>
                {icon}
            </ListItemIcon>

            {/* Text */}
            <ListItemText>
                {label}
            </ListItemText>
        </ListItemButton>
    )
};

export default NavItem;