import React from 'react';
// Utils
import replaceContentWithCarousel from './replaceContentWithCarousel';
// @mui components
import {makeStyles} from '@mui/material/styles';

// RegEx to match carousels in MD
// Syntax is like
// <p>[CAROUSEL]</p>
// ... *img components*
// <p>[END-CAROUSEL]</p>
const BEGIN_CAROUSEL = "<p>[CAROUSEL]</p>";
const END_CAROUSEL = "<p>[END-CAROUSEL]</p>";
const MATCH_CAROUSEL = new RegExp("<p>\\[CAROUSEL\\]<\\/p>[\\s\\S]*<p>\\[END-CAROUSEL\\]<\\/p>");

const Carousel: React.FC = () => {



    return (
        <div>

        </div>
    )
};

export {MATCH_CAROUSEL, BEGIN_CAROUSEL, END_CAROUSEL, replaceContentWithCarousel};
export default Carousel;