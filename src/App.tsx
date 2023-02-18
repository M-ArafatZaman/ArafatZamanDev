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
import P404 from './pages/404';
// Import carousel and iPhone carousel
import './components/Carousel/carousel.css';
import './components/Carousel/iphone.css';
// Loaders
import {GetPortfolioItemsLoader, ViewPortfolioItemLoader} from './pages/portfolio/loader';
import {GetProjectsLoader, ViewProjectLoader} from './pages/projects/loader';
// Page components
import Home from './pages/home';
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
					element: <FadeInWrapper><Home/></FadeInWrapper>
				},
				{
					path: "portfolio/",
					loader: GetPortfolioItemsLoader,
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Portfolio/></FadeInWrapper> </Suspense>,
					children: [
						// Sub /portfolio/ paths
						{
							path: "",
							element: <Suspense> <FadeInWrapper> <PortfolioItemsPage/> </FadeInWrapper> </Suspense>
						},
						{
							path: ":slug/",
							loader: ViewPortfolioItemLoader,
							element: <Suspense> <FadeInWrapper> <ViewPortfolio/> </FadeInWrapper> </Suspense>
						}
					]
				},
				{
					path: "projects/",
					loader: GetProjectsLoader,
					element: <Suspense fallback={<Loader/>}> <FadeInWrapper><Projects/></FadeInWrapper> </Suspense>,
					children: [
						// Sub /projects/ paths
						{
							path: "",
							element: <Suspense> <FadeInWrapper> <ProjectItems/> </FadeInWrapper> </Suspense>
						},
						{
							path: ":slug/",
							loader: ViewProjectLoader,
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
				},
				// 404 page
				{
					path: "*",
					element: <P404/>
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
