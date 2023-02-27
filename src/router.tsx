import React, {Suspense} from 'react';
import {createBrowserRouter, RouteObject} from 'react-router-dom';
import {LazyImport, FadeInWrapper} from './utils';
// Main index, loader, and error page;
import Root from './layout';
import Loader from './layout/loader';
import P404 from './pages/P404';
// Page components
// Loaders
import {GetPortfolioItemsLoader, ViewPortfolioItemLoader} from './pages/portfolio/loader';
import {GetProjectsLoader, ViewProjectLoader} from './pages/projects/loader';
import {GetBlogsLoader, ReadBlogLoader} from './pages/blog/loader';
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

export const ROUTES: RouteObject[] = [
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
                loader: GetBlogsLoader,
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
                        loader: ReadBlogLoader,
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
]

const Router = createBrowserRouter(ROUTES);

export default Router;