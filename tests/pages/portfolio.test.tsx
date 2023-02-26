import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {enableFetchMocks} from 'jest-fetch-mock';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import {BASE} from '../../src/config';

// Test runner
describe("Portfolio page app test", () => {
    beforeAll(() => {
        enableFetchMocks();
    });
    
    it("Portfolio Items page test", async () => {
        // Check if all items are rendered properly
        const { getByText } = render(
            <App/>
        );
        const user = userEvent.setup();
        
        // Go to the portfolio page
        await user.click(getByText("PORTFOLIO"));

        await waitFor(() => expect(getByText("Error")).toBeTruthy());
    })

});