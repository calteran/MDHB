import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import {SessionProvider} from "next-auth/react";


const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <SessionProvider session={pageProps.session}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>{process.env.HOME_TITLE || 'My Digital Home Binder'}</title>
                    <meta name="description" content={'Digital House Binder for ' + (process.env.HOME_TITLE || 'My Digital Home Binder')} />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </SessionProvider>
    );
}
