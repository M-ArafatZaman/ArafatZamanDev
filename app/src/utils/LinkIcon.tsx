import React from 'react';
// @mui link component
import Link from '@mui/material/Link';

interface LinkIconProp {
    href?: string;
    children?: React.ReactNode;
    icon?: JSX.Element;
    target?: "_blank" | "_self" | "_parent" | "_top";
};

const LinkIcon: React.FC<LinkIconProp> = (props: LinkIconProp) => {
    const {children, icon, href, target="_self"} = props;

    return (
        <Link href={href} target={target} sx={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center"
        }}>{children}&nbsp;{icon}</Link>
    );
};

export default LinkIcon;