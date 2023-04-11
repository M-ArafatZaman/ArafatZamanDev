import React from 'react';
import type {
    LinksFunction,
    MetaFunction,
} from "@remix-run/node"; 
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "@remix-run/react";
// CSS styles
import indexCSS from "./src/index.css";
import animateCSS from 'animate.css';
import utilCSS from './src/utils/index.css';
import carouselCSS from './src/components/Carousel/index.css';
import hljsCSS from 'highlight.js/styles/github-dark-dimmed.css';
// Some layout components like header and footer
import Header from "./src/layout/header";
import Footer from "./src/layout/footer";
// @mui components
import Box from "@mui/material/Box";
// App theme
import { APP_THEME as theme } from "./src/appTheme";
// Some icons
import Logo192 from './static/logo192.png';
// A fadein Wrapper
import {FadeInWrapper} from './src/utils';
// Some cache helpers and components
import { withEmotionCache } from '@emotion/react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import ClientStyleContext from "./ClientStyleContext";

// All <link/> tags
export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: indexCSS },
        { rel: "stylesheet", href: animateCSS },
        { rel: "stylesheet", href: utilCSS},
        { rel: "stylesheet", href: carouselCSS},
        { rel: "stylesheet", href: hljsCSS}
    ];
};
  
interface DocumentProps {
    children: React.ReactNode;
}
  
// The document component
const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
    const clientStyleData = React.useContext(ClientStyleContext);
  
    // Only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="theme-color" content={theme.palette.primary.main} />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href={Logo192} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"/>
                <Meta />
                <Links />
                <meta name="emotion-insertion-point" content="emotion-insertion-point" />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
});

// Client component
export default function App() {
    return (
        <Document>
            <Box sx={{
                maxWidth: "100vw",
                minHeight: "100vh",
                backgroundColor: theme.palette.background.paper,
                position: "relative",
                overflowX: "hidden",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column"
            }}>
                <Header/>
                <Box display="flex" flexGrow={1} flexDirection="column">
                    <FadeInWrapper>
                        <Outlet/>
                    </FadeInWrapper>
                </Box>
                <Footer/>
            </Box>
        </Document>
    );
}