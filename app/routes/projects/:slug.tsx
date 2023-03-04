import React from 'react';
import {MetaFunction} from '@remix-run/node';
// Import page component
import ViewProject from '../../src/pages/projects/ViewProject';
// Loader and types
import {ViewProjectLoader} from '../../src/pages/projects/loader';
// Meta function
import {MetaTags} from '../../src/utils';

export {ViewProjectLoader as loader};


export const meta: MetaFunction<typeof ViewProjectLoader> = ({data}) => {
    if (data.status !== "OK") {
        return MetaTags({
            title: "Not found.",
            description: "Sorry! Could not locate any relevant portfolio resource.",
            image: "https://i.imgur.com/orYlTL7.png"
        })
    }

    return MetaTags({
        title: data.item.name,
        description: data.item.short_description,
        image: data.item.imageURL
    })
};

export default ViewProject;