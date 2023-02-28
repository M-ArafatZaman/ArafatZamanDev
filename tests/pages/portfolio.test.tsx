import React from 'react';
import {render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {ROUTES} from '../../src/router';
import {server} from '../setupTests';
import {MockPortfolioErrorHandlers} from '../mocks';

// Test runner for success cases
describe("Success Tests", () => {

    it("List all portfolio item", async () => {
        // Create the router and render the app
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/portfolio/"],
            initialIndex: 0
        });
        const { getByText } = render( <RouterProvider router={router} /> );
        // Wait until the lottie is loaded
        await waitFor(() => expect(document.getElementById("lottie")).toBeTruthy());
        // Now wait again until the lottie is removed
        await waitForElementToBeRemoved(document.getElementById("lottie"));
        // NOW we check if portfolio item 1 exists
        await waitFor(() => expect(getByText("Portfolio Item 1")).toBeInTheDocument());
    });


    it("Views portfolio item", async () => {
        // Create the router
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/portfolio/portfolio-item-1/"],
            initialIndex: 0
        });
        // Render the app
        const { getByText } = render( <RouterProvider router={router} /> );
        // Checkk if content is rendered properly
        await waitFor(() => expect(getByText("This is the content of Portfolio Item 1")).toBeInTheDocument());
    })
});


// Test runner
describe("Error Tests", () => {
    
    it("List all portfolio items", async () => {
        // @override to add the error handlers
        server.use(...MockPortfolioErrorHandlers);
        // Create the router and render the app
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/portfolio/"],
            initialIndex: 0
        });
        const { getByText } = render( <RouterProvider router={router} /> );
        // Check if an error is in the document
        await waitFor(() => expect(getByText("Error")).toBeInTheDocument());
    });

    it("View portfolio item", async () => {
        // Create the router and render the app
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/portfolio/does-not-exist/"],
            initialIndex: 0
        });
        const { getByText } = render( <RouterProvider router={router} /> );
        // Check if an error is in the document
        await waitFor(() => expect(getByText("Error")).toBeInTheDocument());
    })
});
