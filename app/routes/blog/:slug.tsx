import React from 'react';
import {MetaFunction} from '@remix-run/node';
// Import page component
import ViewBlog from '../../src/pages/blog/ViewBlog';
// Loader and types
import {ReadBlogLoader} from '../../src/pages/blog/loader';
// Meta function
import {MetaTags} from '../../src/utils';

export {ReadBlogLoader as loader};


export const meta: MetaFunction<typeof ReadBlogLoader> = ({data}) => {
    if (data.status !== "OK") {
        return MetaTags({
            title: "Not found.",
            description: "Sorry! Could not locate any relevant blog resources.",
            image: "https://i.imgur.com/orYlTL7.png"
        })
    }

    return MetaTags({
        title: data.payload.name,
        description: data.payload.short_description,
        image: data.payload.imageURL
    })
};

export default ViewBlog;