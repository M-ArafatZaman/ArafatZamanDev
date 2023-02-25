import React from 'react';
import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom';
import {enableFetchMocks} from 'jest-fetch-mock';
import {render, waitFor, screen} from '@testing-library/react';
import Portfolio from '../../src/pages/portfolio';
import PortfolioItems from '../../src/pages/portfolio/PortfolioItems';
import {PortfolioAPIResponse} from '../../src/pages/portfolio/types';

// Define a basic route
const routes = createBrowserRouter([
    {
        path: "/",
        element: <Portfolio/>,
        loader: () => {
            // Return a mock response
            const data: PortfolioAPIResponse = {
                status: "OK",
                items: [ 
                    {
                        name: "Portfolio Item 1 Name",
                        short_description: "Description",
                        imageURL: "NULL",
                        slug: "item",
                        tags: ["tag1"]
                    }
                ]
            };

            return new Promise((resolve) => resolve({response: data})); 
        },
        children: [
            {
                path: "",
                element: <PortfolioItems/>
            }
        ]
    }
]);

// Test runner
describe("Portfolio page app test", () => {
    beforeAll(() => {
        enableFetchMocks();
    });
    
    it("Portfolio Items page test", async () => {
        // Check if all items are rendered properly
        window.history.pushState({}, "/", "Root portfolio");
        const { getByText } = render(
            <RouterProvider router={routes} />
        );
    
        await waitFor(() => 
            expect(getByText("Portfolio Item 1 Name")).toBeTruthy()
        );
    })

});