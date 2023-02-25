import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import "jest-canvas-mock";
import {render, screen, waitFor} from '@testing-library/react';
import Home from '../../src/pages/home';


test("The home page renders correctly", () => {
    render(
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    );
    
    // The "VISIT" button for the portfolio sections are rendered correctly
    waitFor(() => {
        expect(screen.findByText("VISIT")).toBeTruthy();
    })

    // Expect InPeril title to be rendered
    waitFor(() => {
        expect(screen.getByText("InPeril")).toBeTruthy();
    })

    // Expect LyricsFinder title to be rendered
    waitFor(() => {
        expect(screen.getByText("LyricsFinder")).toBeTruthy();
    })
})