import React from 'react';
import {render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {ROUTES} from '../../src/router';
import {server} from '../setupTests';
import {MockPortfolioErrorHandlers} from '../mocks';

// Test runner for success cases
describe("Success Tests", () => {

    it("List all portfolio item", async () => {
        // Create the router
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/portfolio/"],
            initialIndex: 0
        });

        // Check if all items are rendered properly
        const { getByText } = render( <RouterProvider router={router} /> );
        
        // Wait until the lottie is loaded
        await waitFor(() => expect(document.getElementById("lottie")).toBeTruthy());
        // Now wait again until the lottie is removed
        await waitForElementToBeRemoved(document.getElementById("lottie"));
        // NOW we check if portfolio item 1 exists
        await waitFor(() => getByText("Portfolio Item 1"));
    });


    it("Views portfolio item", async () => {
        // Create the router
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/portfolio/portfolio-item-1/"],
            initialIndex: 0
        });

        // Check if all items are rendered properly
        const { findAllByText } = render( <RouterProvider router={router} /> );

        await waitFor(() => findAllByText("Portfolio Item 1"), {timeout: 1500});
    })
});


// Test runner
describe("Error Tests", () => {
    
    it("List all portfolio items", async () => {
        // @override to add the error handlers
        server.use(...MockPortfolioErrorHandlers);

        // Create the router
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/portfolio/"],
            initialIndex: 0
        });

        // Check if there is an error
        const { getByText } = render( <RouterProvider router={router} /> );
        
        await waitFor(() => expect(getByText("Error")).toBeTruthy());
    });

    it("View portfolio item", async () => {
        // Create the router
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/portfolio/does-not-exist/"],
            initialIndex: 0
        });

        // Check if there is an error
        const { getByText } = render( <RouterProvider router={router} /> );
        
        await waitFor(() => expect(getByText("Error")).toBeInTheDocument());
    })
});
