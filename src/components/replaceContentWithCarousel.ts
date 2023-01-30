import getCarouselJS from "./getCarouselJs";
import {generateString} from '../utils';
// RegEx to match carousels in MD
// Syntax is like
// <p>[CAROUSEL]</p>
// ... *img components*
// <p>[END-CAROUSEL]</p>
const BEGIN_CAROUSEL = "<p>[CAROUSEL]</p>";
const END_CAROUSEL = "<p>[END-CAROUSEL]</p>";
// <p>\\[CAROUSEL\\]<\\/p>[\\s\\S]*<p>\\[END-CAROUSEL\\]<\\/p>
const MATCH_CAROUSEL = new RegExp("(<p>\\[CAROUSEL\\]<\\/p>)[\\s\\S]+?(<p>\\[END-CAROUSEL\\]<\\/p>)");
const PARAGRAPH_BEGIN = "<p>";
const PARAGRAPH_END = "</p>";

interface replaceContentWithCarouselType {
    html: string;
    js: string[];
}

function replaceContentWithCarousel(html: string): replaceContentWithCarouselType {
    let match = MATCH_CAROUSEL.exec(html);
    let JAVASCRIPT: string[] = [];

    while (match !== null) {
        // Get the matched content and filter appropriately
        let matchContent = match[0];
        matchContent = matchContent.substring(BEGIN_CAROUSEL.length, matchContent.length - END_CAROUSEL.length);
        // Remove null strings and the <p></p> tags
        let imageTags = matchContent.split("\n").filter((str) => str !== "").map((str) => str.substring(PARAGRAPH_BEGIN.length, str.length - PARAGRAPH_END.length));
        
        let id = generateString(10);
        let carousel = `
        <div class="carousel-container" id="${id}">
            <!-- Container -->
            <div class="carousel-inner">
                ${imageTags.map((img, i) => (`
                <div class="carousel-item ${i == 0 ? 'carousel-active' : ''}">
                    ${img}
                </div>
                `)).join("")}
            </div>

            <!-- Controls -->
            <div class="carousel-controls">
                <div class="carousel-controls-prev"><i class="fas fa-chevron-left"></i></div>
                <div class="carousel-controls-next"><i class="fas fa-chevron-right"></i></div>
            </div>
        </div>
        `;
        let carouselScript = getCarouselJS(id);

        html = html.replace(match[0], carousel);
        JAVASCRIPT[JAVASCRIPT.length] = carouselScript;

        // Get new match
        match = MATCH_CAROUSEL.exec(html);
        
    };

    return {
        html: html,
        js: JAVASCRIPT
    };
};

export default replaceContentWithCarousel;