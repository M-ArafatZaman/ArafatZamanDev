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
// Import carousel and iPhone carousel
import './components/Carousel/carousel.css';
import './components/Carousel/iphone.css';
// Page components
const Home = LazyImport(() => import("./pages/home"));
const Portfolio = LazyImport(() => import("./pages/portfolio"));
const Projects = LazyImport(() => import("./pages/projects"));
const Blog = LazyImport(() => import("./pages/blog"));
const Contact = LazyImport(() => import("./pages/contact"));
// Sub /portfolio/ page components
const PortfolioItemsPage = LazyImport(() => import("./pages/portfolio/PortfolioItems"));
const ViewPortfolio = LazyImport(() => import("./pages/portfolio/ViewPortfolio"));
// Sub /blog/ page components
const BlogItems = LazyImport(() => import("./pages/blog/BlogItems"));
const ViewBlog = LazyImport(() => import("./pages/blog/ViewBlog"));
// Sub /projects/ page components
const ProjectItems = LazyImport(() => import("./pages/projects/ProjectItems"));
const ViewProject = LazyImport(() => import("./pages/projects/ViewProject"));


const App: React.FC = () => {

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
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Portfolio/></FadeInWrapper> </Suspense>,
					children: [
						// Sub /portfolio/ paths
						{
							path: "",
							element: <Suspense> <FadeInWrapper> <PortfolioItemsPage/> </FadeInWrapper> </Suspense>
						},
						{
							path: ":slug/",
							element: <Suspense> <FadeInWrapper> <ViewPortfolio/> </FadeInWrapper> </Suspense>
						}
					]
				},
				{
					path: "projects/",
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Projects/></FadeInWrapper> </Suspense>,
					children: [
						// Sub /projects/ paths
						{
							path: "",
							element: <Suspense> <FadeInWrapper> <ProjectItems/> </FadeInWrapper> </Suspense>
						},
						{
							path: ":slug/",
							element: <Suspense> <FadeInWrapper> <ViewProject/> </FadeInWrapper> </Suspense>
						}
					]
				},
				{
					path: "blog/",
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Blog/></FadeInWrapper> </Suspense>,
					children: [
						// Sub /blog/ paths
						{
							path: "",
							element: <Suspense> <FadeInWrapper> <BlogItems/> </FadeInWrapper> </Suspense>
						},
						// Sub view blog path
						{
							path: ":slug/",
							element: <Suspense> <FadeInWrapper> <ViewBlog /> </FadeInWrapper> </Suspense>
						}
					]
				},
				{
					path: "contact/",
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Contact/></FadeInWrapper> </Suspense>
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
