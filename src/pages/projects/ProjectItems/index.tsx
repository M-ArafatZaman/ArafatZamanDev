import React, {useContext} from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
// Components
import ProjectItemGrid from './ProjectItemGrid';
// Context
import {ProjectsContext} from '../reducer';

const ProjectItems: React.FC = () => {
    const context = useContext(ProjectsContext);

    return (
        <Grid container justifyContent="center" spacing={2}>
            {context.isLoading ? 
            <Typography>LOADING...</Typography>
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