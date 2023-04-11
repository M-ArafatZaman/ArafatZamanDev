import React, { useState, useMemo, startTransition } from 'react';
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createEmotionCache';
import ClientStyleContext from './ClientStyleContext';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {APP_THEME as theme} from './src/appTheme';

interface ClientCacheProviderProps {
    children: React.ReactNode;
};

function ClientCacheProvider({children}: ClientCacheProviderProps) {
    const [cache, setCache] = useState(createEmotionCache());

    const clientStyleContextValue = useMemo(() => ({
        reset() {
            setCache(createEmotionCache())
        }
    }), []);

    return (
        <ClientStyleContext.Provider value={clientStyleContextValue}>
            <CacheProvider value={cache}>
                {children}
            </CacheProvider>
        </ClientStyleContext.Provider>
    )
};

const hydrate = () => {
    startTransition(() => {
        hydrateRoot(
            document,
            <ClientCacheProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <RemixBrowser/>
                </ThemeProvider>
            </ClientCacheProvider>
        )
    })
}

// @ts-ignore
if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate);
} else {
    window.setTimeout(hydrate, 1);
};