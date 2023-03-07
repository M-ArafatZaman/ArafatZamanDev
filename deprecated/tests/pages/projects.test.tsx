import React from 'react';
import {render, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {ROUTES} from '../../src/router';
import {server} from '../setupTests';
import {MockProjectsErrorHandlers} from '../mocks';

// Test runner for success cases
describe("Success Tests", () => {

    it("List all projects item", async () => {
        // Create the router and render the app
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/projects/"],
            initialIndex: 0
        });
        const { getByText } = render( <RouterProvider router={router} /> );
        // Wait until the lottie is loaded
        await waitFor(() => expect(document.getElementById("lottie")).toBeInTheDocument());
        // Now wait again until the lottie is removed
        await waitForElementToBeRemoved(document.getElementById("lottie"));
        // NOW we check if project item 1 exists
        await waitFor(() => expect(getByText("Project Item 1")).toBeInTheDocument());
    });


    it("Views project item", async () => {
        // Create the router
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/projects/project-item-1/"],
            initialIndex: 0
        });
        // Render the app
        const { getByText } = render( <RouterProvider router={router} /> );
        // Check if content is rendered properly
        await waitFor(() => expect(getByText("This is the content of Project Item 1")).toBeInTheDocument());
    })
});


// Test runner
describe("Error Tests", () => {
    
    it("List all projects items", async () => {
        // @override to add the error handlers
        server.use(...MockProjectsErrorHandlers);
        // Create the router and render the app
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/projects/"],
            initialIndex: 0
        });
        const { getByText } = render( <RouterProvider router={router} /> );
        // Check if an error is in the document
        await waitFor(() => expect(getByText("Error")).toBeInTheDocument());
    });

    it("View project item", async () => {
        // Create the router and render the app
        const router = createMemoryRouter(ROUTES, {
            initialEntries: ["/projects/does-not-exist/"],
            initialIndex: 0
        });
        const { getByText } = render( <RouterProvider router={router} /> );
        // Check if an error is in the document
        await waitFor(() => expect(getByText("Error")).toBeInTheDocument());
    })
});
