// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom';
import "jest-canvas-mock";
import fetchMock from 'jest-fetch-mock';
import {MockPortfolioHandler, MockProjectsHandlers, MockBlogHandlers} from './mocks';
import {setupServer} from 'msw/node';
window.scrollTo = jest.fn();

const HANDLERS = [
    ...MockPortfolioHandler,
    ...MockProjectsHandlers,
    ...MockBlogHandlers
];
export const server = setupServer(...HANDLERS);

beforeAll(() => {
    fetchMock.enableMocks();
    fetchMock.dontMock();
    server.listen();
});

beforeEach(() => {
    jest.setTimeout(10000);
});

afterEach(() => {
    server.resetHandlers();
    //server.restoreHandlers();
});

afterAll(() => {
    jest.clearAllMocks();
    server.close();
});

// Mock the raspberry pi component
jest.mock("../src/pages/home/raspberry", () => {
    const Fn: React.FC = () => {
        return React.createElement("span");
    };
    return Fn;
});