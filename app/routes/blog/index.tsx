import React from 'react';
import {MetaFunction} from '@remix-run/node';
import {GetBlogsLoader} from '../../src/pages/blog/loader';
import BlogItems from '../../src/pages/blog/BlogItems';
// Util functions
import {MetaTags} from '../../src/utils';

// Loader
export {GetBlogsLoader as loader};

// Meta function
export const meta: MetaFunction<typeof GetBlogsLoader> = () => MetaTags({
    title: "Blogs",
    description: "Read my blogs and get an insight on my thoughts on tech, finance, and more.",
    image: "https://i.imgur.com/tvDZBHb.png"
})

// The default component
export default BlogItems;