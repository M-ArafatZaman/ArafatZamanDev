// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom';
import "jest-canvas-mock";
import fetchMock from 'jest-fetch-mock';
import {MockPortfolioHandler} from './mocks';
import {setupServer} from 'msw/node';
import {TextEncoder, TextDecoder} from 'util';
window.scrollTo = jest.fn();

type A = typeof window.TextDecoder;
// Add text encoders and decoders polyfill
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as A;

export const server = setupServer(...MockPortfolioHandler);

beforeAll(() => {
    fetchMock.enableMocks();
    fetchMock.dontMock();
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
    server.restoreHandlers();
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