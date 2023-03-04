import React from 'react';
import {MetaFunction} from '@remix-run/node';
// Import the Home component
import Home from '../src/pages/home';
import { MetaTags } from '../src/utils';

export const meta: MetaFunction = () => MetaTags({
    title: "ArafatZaman",
    description: "Welcome to my portfolio website built using React and Remix.",
    image: "https://i.imgur.com/o5tBgUz.png"
})

export default Home;