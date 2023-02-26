import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import {server} from '../setupTests';
import {MockPortfolioErrorHandlers} from '../mocks';

// Test runner for success cases
describe("Success Tests", () => {

    it("List all portfolio item", async () => {
        // Check if all items are rendered properly
        const { getByText } = render(
            <App/>
        );
        const user = userEvent.setup();
        // Go to the portfolio page
        await user.click(getByText("PORTFOLIO"));

        await waitFor(() => expect(getByText("Portfolio Item 1")).toBeTruthy());
    });
});


// Test runner
describe("Error Tests", () => {
    
    it("List all portfolio items", async () => {
        // @override to add the error handlers
        server.use(...MockPortfolioErrorHandlers);

        // Check if all items are rendered properly
        const { getByText } = render(
            <App/>
        );
        const user = userEvent.setup();
        // Go to the portfolio page
        await user.click(getByText("PORTFOLIO"));
        
        await waitFor(() => expect(getByText("Error")).toBeTruthy());
    });
});
