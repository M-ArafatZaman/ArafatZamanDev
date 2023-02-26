import React from 'react';
import fetchMock from 'jest-fetch-mock';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import {setupServer} from 'msw/node';
import MockPortfolioHandlers, {MockErrorHandlers} from '../mocks/portfolioHandler';

const successServer = setupServer(...MockPortfolioHandlers);
// Test runner for success cases
describe("Portfolio page app test - Success", () => {
    beforeAll(() => {
        fetchMock.enableMocks();
        fetchMock.dontMock();
        successServer.listen();
    });
    afterAll(() => {
        successServer.resetHandlers();
        successServer.close();
    })

    it("List all portfolio item - Success", async () => {
        // Check if all items are rendered properly
        const { getByText } = render(
            <App/>
        );
        const user = userEvent.setup();
        // Go to the portfolio page
        await user.click(getByText("PORTFOLIO"));

//        await waitFor(() => expect(getByText("Error")).toBeFalsy());
        await waitFor(() => expect(getByText("Portfolio Item 1")).toBeTruthy());
    }, 3000)
});

const errorServer = setupServer(...MockErrorHandlers);
// Test runner
describe("Portfolio page app test - Errors", () => {
    beforeAll(() => {
        fetchMock.enableMocks();
        fetchMock.dontMock();
        errorServer.listen();
    });
    
    it("List all portfolio items - Error", async () => {
        // Check if all items are rendered properly
        const { getByText } = render(
            <App/>
        );
        const user = userEvent.setup();
        // Go to the portfolio page
        await user.click(getByText("PORTFOLIO"));
        
        await waitFor(() => expect(getByText("Error")).toBeTruthy());
    });

    afterAll(() => {
        errorServer.resetHandlers();
        errorServer.close();
    })
});
