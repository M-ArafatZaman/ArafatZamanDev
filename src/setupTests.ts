// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom';
window.scrollTo = jest.fn();

afterAll(() => {
    jest.clearAllMocks();
});

// Mock the raspberry pi component
jest.mock("./pages/home/raspberry", () => {
    const Fn: React.FC = () => {
        return React.createElement("span");
    };
    return Fn;
});