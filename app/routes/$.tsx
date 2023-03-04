import React from 'react';
import {MetaFunction} from '@remix-run/node';
import {MetaTags} from '../src/utils';
// Error 404 page
import P404 from '../src/pages/P404';

export const meta: MetaFunction = () => MetaTags({
    title: "Not found.",
    description: "Sorry! Could not locate any relevant page.",
    image: "https://i.imgur.com/orYlTL7.png"
});

export default P404;