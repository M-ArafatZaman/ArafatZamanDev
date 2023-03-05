import React from 'react';
import {MetaFunction} from '@remix-run/node';
// Import the contact component
import Contact from '../src/pages/contact';
import { MetaTags } from '../src/utils';

export const meta: MetaFunction = () => MetaTags({
    title: "Contact",
    description: "Reach out to me via email or send an anonymous message.",
    image: "https://i.imgur.com/aC0lx81.png"
})

export default Contact;