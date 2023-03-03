import React, {Suspense} from 'react';
// React router
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
// APP THEME
import {APP_THEME} from '../app/src/appTheme';
// @MUI
import {ThemeProvider} from '@mui/material/styles';
// Import carousel and iPhone carousel
import './components/Carousel/carousel.css';
import './components/Carousel/iphone.css';
// The router
import Router from './router';

const App: React.FC = () => {

	return (
		<ThemeProvider theme={APP_THEME}>
			<RouterProvider router={Router} />
		</ThemeProvider>
	);
}

export default App;
