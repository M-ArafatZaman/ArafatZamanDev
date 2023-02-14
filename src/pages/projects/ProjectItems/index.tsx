import React, {useContext} from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
// Components
import ProjectItemGrid from './ProjectItemGrid';
import Error from '../../../components/Error';
// Context
import {ProjectsContext} from '../reducer';

const ProjectItems: React.FC = () => {
    const context = useContext(ProjectsContext);

    return (
        <Grid container justifyContent="center" spacing={2}>
            {
            // Content is still loading
            context.isLoading ? 
            [1,2,3,4].map((i) => (
                <Grid key={i} item xs={12} md={3}>
                    <Skeleton variant="rounded" height={100} />
                </Grid>
            ))
            :
            // An error occured
            context.error ?
            <Grid item xs={12}>
                <Error message={context.errorMessage} />
            </Grid>
            :
            context.items.map((projects, i) => (
                <ProjectItemGrid
                    key={i}
                    name={projects.name}
                    short_description={projects.short_description}
                    imageURL={projects.imageURL}
                    slug={projects.slug}
                />
            ))}
        </Grid>
    )
};

export default ProjectItems;