import React from 'react';
import {MetaFunction} from '@remix-run/node';
import {GetProjectsLoader} from '../../src/pages/projects/loader';
import ProjectItems from '../../src/pages/projects/ProjectItems';
// Util functions
import {MetaTags} from '../../src/utils';

// Loader
export {GetProjectsLoader as loader};

// Meta function
export const meta: MetaFunction<typeof GetProjectsLoader> = () => MetaTags({
    title: "Project items",
    description: "View all my projects.",
    image: "https://i.imgur.com/ndTBego.png"
})

// The default component
export default ProjectItems;