import type {
    LinksFunction,
    MetaFunction,
} from "@remix-run/node"; 
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts
} from "@remix-run/react";
import indexCSS from "./src/index.css";
// Some layout components like header and footer
import Header from "./src/layout/header";
import Footer from "./src/layout/footer";
// @mui components
import Box from "@mui/material/Box";
import {ThemeProvider} from "@mui/material/styles";
// App theme
import { APP_THEME } from "./src/appTheme";
// Some icons
import Logo192 from './static/logo192.png';
// A fadein Wrapper
import {FadeInWrapper} from './src/utils';

// All <link/> tags
export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: indexCSS }
    ];
};
  
// All <meta/> tags
export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Arafat Zaman",
    viewport: "width=device-width, initial-scale=1",
    "theme-color": "#000000",
    description: "My portfolio website"
});
  
// Client component
export default function App() {
    return (
        <html lang="en">
            <head>
                {/* All meta exports on all routes will go here */}
                <Meta />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href={Logo192} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"/>
  
                {/* All link exports on all routes will go here */}
                <Links />
            </head>
            <body>
                {/* Child routes go here */}
                <ThemeProvider theme={APP_THEME}>
                    <Box sx={{
                        maxWidth: "100vw",
                        minHeight: "100vh",
                        backgroundColor: APP_THEME.palette.background.paper,
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
                </ThemeProvider>
  
                {/* Script tags go here */}
                {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
                <Scripts />
        
                {/* Sets up automatic reload when you change code */}
                {/* and only does anything during development */}
                {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
                <LiveReload />
            </body>
        </html>
    );
}