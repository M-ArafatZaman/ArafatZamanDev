import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {render, waitFor} from '@testing-library/react';
import Home from '../../src/pages/home';

test("The home page renders correctly", async () => {
    const {findByText, getByText} = render(
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    );

    // The "VISIT" button for the portfolio sections are rendered correctly
    await waitFor(() => {
        return expect(findByText("VISIT")).toBeTruthy();
    });

    // Expect InPeril title to be rendered
    await waitFor(() => {
        return expect(getByText("InPeril")).toBeTruthy();
    })

    // Expect LyricsFinder title to be rendered
    await waitFor(() => {
        return expect(getByText("LyricsFinder")).toBeTruthy();
    })
})