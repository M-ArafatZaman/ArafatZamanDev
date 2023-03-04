import React from 'react';
import {useLoaderData} from '@remix-run/react';
// @mui components
import Grid from '@mui/material/Grid';
// Components
import ProjectItemGrid from './ProjectItemGrid';
import Error from '../../../components/Error';
// Loader and types
import {GetProjectsLoader} from '../loader';
import {GetProjectsAPIResponse} from '../types';
// Projects wrapper
import Projects from '../index';

const ProjectItems: React.FC = () => {
    const data: GetProjectsAPIResponse = useLoaderData<typeof GetProjectsLoader>();

    return (
        <Projects>
            <Grid container justifyContent="center" spacing={2}>
                {
                // An error occured
                data.status !== "OK" ?
                <Grid item xs={12}>
                    <Error message="Sorry, an unknown error occured." />
                </Grid>
                :
                data.items.map((projects, i) => (
                    <ProjectItemGrid
                        key={i}
                        name={projects.name}
                        short_description={projects.short_description}
                        imageURL={projects.imageURL}
                        slug={projects.slug}
                    />
                ))}
            </Grid>
        </Projects>
    )
};

export default ProjectItems;