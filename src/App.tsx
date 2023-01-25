import React, {Suspense} from 'react';
// React router
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
// APP THEME
import {APP_THEME} from './appTheme';
// @MUI
import {ThemeProvider} from '@mui/material/styles';
// Utils
import {FadeInWrapper, LazyImport} from './utils';
// Main index and loader
import Root from './layout';
import Loader from './layout/loader';
// Page components
const Home = LazyImport(() => import("./pages/home"));
const Portfolio = LazyImport(() => import("./pages/portfolio"));
const Projects = LazyImport(() => import("./pages/projects"));
const Blog = LazyImport(() => import("./pages/blog"));
const Contact = LazyImport(() => import("./pages/contact"));
// Sub page components
const ViewPortfolio = LazyImport(() => import("./pages/portfolio/viewPortfolio"));


function App() {

	// Create router
    const Router = createBrowserRouter([
		{
			path: "/",
			element: <Root/>,
			children: [
				// Main page directories
				{
					path: "",
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Home/></FadeInWrapper> </Suspense>
				},
				{
					path: "portfolio/",
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Portfolio/></FadeInWrapper> </Suspense>
				},
				{
					path: "projects/",
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Projects/></FadeInWrapper> </Suspense>
				},
				{
					path: "blog/",
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Blog/></FadeInWrapper> </Suspense>
				},
				{
					path: "contact/",
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Contact/></FadeInWrapper> </Suspense>
				},
				// Sub portfolio directories
				{
					path: "portfolio/:slug",
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><ViewPortfolio/></FadeInWrapper> </Suspense>
				}
			]
		}
    ]);

	return (
		<ThemeProvider theme={APP_THEME}>
			<RouterProvider router={Router} />
		</ThemeProvider>
	);
}

export default App;
